import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Clock,
  Color,
  InstancedMesh,
  MathUtils,
  MeshPhysicalMaterial,
  Object3D,
  PMREMGenerator,
  PerspectiveCamera,
  Plane,
  PointLight,
  Raycaster,
  SRGBColorSpace,
  Scene,
  ShaderChunk,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  type WebGLRendererParameters,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// ─── ThreeApp ────────────────────────────────────────────────────────────────

interface ThreeAppOptions {
  canvas?: HTMLCanvasElement;
  id?: string;
  size?: "parent" | "window" | { width: number; height: number };
  rendererOptions?: Partial<WebGLRendererParameters>;
}

interface SizeInfo {
  width: number;
  height: number;
  wWidth: number;
  wHeight: number;
  ratio: number;
  pixelRatio: number;
}

interface FrameInfo {
  elapsed: number;
  delta: number;
}

class ThreeApp {
  private opts: ThreeAppOptions;
  canvas!: HTMLCanvasElement;
  camera: PerspectiveCamera;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene: Scene;
  renderer: WebGLRenderer;
  private postprocessingSystem?: {
    setSize: (w: number, h: number) => void;
    dispose: () => void;
    render: () => void;
  };
  size: SizeInfo = {
    width: 0,
    height: 0,
    wWidth: 0,
    wHeight: 0,
    ratio: 0,
    pixelRatio: 0,
  };
  renderFn: () => void;
  onBeforeRender: (frame: FrameInfo) => void = () => {};
  onAfterRender: (frame: FrameInfo) => void = () => {};
  onAfterResize: (size: SizeInfo) => void = () => {};
  private isVisible = false;
  private isRunning = false;
  isDisposed = false;
  private intersectionObserver?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private resizeTimeout?: ReturnType<typeof setTimeout>;
  private clock = new Clock();
  private frame: FrameInfo = { elapsed: 0, delta: 0 };
  private rafId?: number;

  constructor(opts: ThreeAppOptions) {
    this.opts = { ...opts };
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
    this.scene = new Scene();
    this.renderer = this.initRenderer();
    this.renderFn = this.defaultRender.bind(this);
    this.resize();
    this.initObservers();
  }

  private initRenderer(): WebGLRenderer {
    if (this.opts.canvas) {
      this.canvas = this.opts.canvas;
    } else if (this.opts.id) {
      this.canvas = document.getElementById(this.opts.id) as HTMLCanvasElement;
    } else {
      console.error("ThreeApp: Missing canvas or id parameter");
    }
    this.canvas.style.display = "block";
    const renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
      ...(this.opts.rendererOptions ?? {}),
    });
    renderer.outputColorSpace = SRGBColorSpace;
    return renderer;
  }

  private initObservers() {
    if (
      !(this.opts.size instanceof Object) ||
      typeof this.opts.size === "string"
    ) {
      window.addEventListener("resize", this.onWindowResize.bind(this));
      if (this.opts.size === "parent" && this.canvas.parentNode) {
        this.resizeObserver = new ResizeObserver(
          this.onWindowResize.bind(this),
        );
        this.resizeObserver.observe(this.canvas.parentNode as Element);
      }
    }
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.isVisible = entries[0].isIntersecting;
        this.isVisible ? this.startLoop() : this.stopLoop();
      },
      { root: null, rootMargin: "0px", threshold: 0 },
    );
    this.intersectionObserver.observe(this.canvas);
    document.addEventListener(
      "visibilitychange",
      this.onVisibilityChange.bind(this),
    );
  }

  private removeObservers() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    document.removeEventListener(
      "visibilitychange",
      this.onVisibilityChange.bind(this),
    );
  }

  private onVisibilityChange() {
    if (this.isVisible) {
      document.hidden ? this.stopLoop() : this.startLoop();
    }
  }

  private onWindowResize() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.resize.bind(this), 100);
  }

  resize() {
    let width: number;
    let height: number;
    const sz = this.opts.size;
    if (sz && typeof sz === "object" && "width" in sz) {
      width = sz.width;
      height = sz.height;
    } else if (sz === "parent" && this.canvas.parentNode) {
      const parent = this.canvas.parentNode as HTMLElement;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    this.size.width = width;
    this.size.height = height;
    this.size.ratio = width / height;
    this.updateCamera();
    this.updateRenderer();
    this.onAfterResize(this.size);
  }

  private updateCamera() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.adjustFov(this.cameraMinAspect);
      } else if (
        this.cameraMaxAspect &&
        this.camera.aspect > this.cameraMaxAspect
      ) {
        this.adjustFov(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  private adjustFov(aspect: number) {
    const tanVal =
      Math.tan(MathUtils.degToRad(this.cameraFov / 2)) /
      (this.camera.aspect / aspect);
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(tanVal));
  }

  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const fovRad = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight =
        2 * Math.tan(fovRad / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    }
  }

  private updateRenderer() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.postprocessingSystem?.setSize(this.size.width, this.size.height);
    let dpr = window.devicePixelRatio;
    if (this.maxPixelRatio && dpr > this.maxPixelRatio)
      dpr = this.maxPixelRatio;
    else if (this.minPixelRatio && dpr < this.minPixelRatio)
      dpr = this.minPixelRatio;
    this.renderer.setPixelRatio(dpr);
    this.size.pixelRatio = dpr;
  }

  get postprocessing() {
    return this.postprocessingSystem;
  }
  set postprocessing(val: typeof this.postprocessingSystem) {
    this.postprocessingSystem = val;
    if (val) this.renderFn = val.render.bind(val);
  }

  get render() {
    return this.renderFn;
  }

  private startLoop() {
    if (this.isRunning) return;
    const animate = () => {
      this.rafId = requestAnimationFrame(animate);
      this.frame.delta = this.clock.getDelta();
      this.frame.elapsed += this.frame.delta;
      this.onBeforeRender(this.frame);
      this.renderFn();
      this.onAfterRender(this.frame);
    };
    this.isRunning = true;
    this.clock.start();
    animate();
  }

  private stopLoop() {
    if (this.isRunning) {
      if (this.rafId !== undefined) cancelAnimationFrame(this.rafId);
      this.isRunning = false;
      this.clock.stop();
    }
  }

  private defaultRender() {
    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    this.scene.traverse((obj) => {
      const mesh = obj as {
        isMesh?: boolean;
        material?: Record<string, unknown> & { dispose: () => void };
        geometry?: { dispose: () => void };
      };
      if (mesh.isMesh && mesh.material) {
        for (const key of Object.keys(mesh.material)) {
          const prop = (mesh.material as Record<string, unknown>)[key];
          if (
            prop &&
            typeof prop === "object" &&
            typeof (prop as { dispose?: () => void }).dispose === "function"
          ) {
            (prop as { dispose: () => void }).dispose();
          }
        }
        mesh.material.dispose();
        mesh.geometry?.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    this.removeObservers();
    this.stopLoop();
    this.clear();
    this.postprocessingSystem?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.isDisposed = true;
  }
}

// ─── Pointer tracking ────────────────────────────────────────────────────────

interface PointerState {
  position: Vector2;
  nPosition: Vector2;
  hover: boolean;
  touching: boolean;
  onEnter: (state: PointerState) => void;
  onMove: (state: PointerState) => void;
  onClick: (state: PointerState) => void;
  onLeave: (state: PointerState) => void;
  dispose: () => void;
}

const pointerMap = new Map<Element, PointerState>();
const globalPointer = new Vector2();
let globalListenersAdded = false;

function createPointer(
  opts: Partial<PointerState> & { domElement: Element },
): PointerState {
  const state: PointerState = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    touching: false,
    onEnter: () => {},
    onMove: () => {},
    onClick: () => {},
    onLeave: () => {},
    dispose: () => {},
    ...opts,
  };

  if (!pointerMap.has(opts.domElement)) {
    pointerMap.set(opts.domElement, state);
    if (!globalListenersAdded) {
      document.body.addEventListener("pointermove", onPointerMove);
      document.body.addEventListener("pointerleave", onPointerLeave);
      document.body.addEventListener("click", onPointerClick);
      document.body.addEventListener("touchstart", onTouchStart, {
        passive: false,
      });
      document.body.addEventListener("touchmove", onTouchMove, {
        passive: false,
      });
      document.body.addEventListener("touchend", onTouchEnd, {
        passive: false,
      });
      document.body.addEventListener("touchcancel", onTouchEnd, {
        passive: false,
      });
      globalListenersAdded = true;
    }
  }

  state.dispose = () => {
    pointerMap.delete(opts.domElement);
    if (pointerMap.size === 0) {
      document.body.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerleave", onPointerLeave);
      document.body.removeEventListener("click", onPointerClick);
      document.body.removeEventListener("touchstart", onTouchStart);
      document.body.removeEventListener("touchmove", onTouchMove);
      document.body.removeEventListener("touchend", onTouchEnd);
      document.body.removeEventListener("touchcancel", onTouchEnd);
      globalListenersAdded = false;
    }
  };

  return state;
}

function onPointerMove(e: PointerEvent) {
  globalPointer.x = e.clientX;
  globalPointer.y = e.clientY;
  processPointerInteraction();
}

function processPointerInteraction() {
  for (const [elem, state] of pointerMap) {
    const rect = elem.getBoundingClientRect();
    if (isInBounds(rect)) {
      updatePointerPos(state, rect);
      if (!state.hover) {
        state.hover = true;
        state.onEnter(state);
      }
      state.onMove(state);
    } else if (state.hover && !state.touching) {
      state.hover = false;
      state.onLeave(state);
    }
  }
}

function onPointerClick(e: MouseEvent) {
  globalPointer.x = e.clientX;
  globalPointer.y = e.clientY;
  for (const [elem, state] of pointerMap) {
    const rect = elem.getBoundingClientRect();
    updatePointerPos(state, rect);
    if (isInBounds(rect)) state.onClick(state);
  }
}

function onPointerLeave() {
  for (const state of pointerMap.values()) {
    if (state.hover) {
      state.hover = false;
      state.onLeave(state);
    }
  }
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    globalPointer.x = e.touches[0].clientX;
    globalPointer.y = e.touches[0].clientY;
    for (const [elem, state] of pointerMap) {
      const rect = elem.getBoundingClientRect();
      if (isInBounds(rect)) {
        state.touching = true;
        updatePointerPos(state, rect);
        if (!state.hover) {
          state.hover = true;
          state.onEnter(state);
        }
        state.onMove(state);
      }
    }
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    globalPointer.x = e.touches[0].clientX;
    globalPointer.y = e.touches[0].clientY;
    for (const [elem, state] of pointerMap) {
      const rect = elem.getBoundingClientRect();
      updatePointerPos(state, rect);
      if (isInBounds(rect)) {
        if (!state.hover) {
          state.hover = true;
          state.touching = true;
          state.onEnter(state);
        }
        state.onMove(state);
      } else if (state.hover && state.touching) {
        state.onMove(state);
      }
    }
  }
}

function onTouchEnd() {
  for (const [, state] of pointerMap) {
    if (state.touching) {
      state.touching = false;
      if (state.hover) {
        state.hover = false;
        state.onLeave(state);
      }
    }
  }
}

function updatePointerPos(state: PointerState, rect: DOMRect) {
  state.position.x = globalPointer.x - rect.left;
  state.position.y = globalPointer.y - rect.top;
  state.nPosition.x = (state.position.x / rect.width) * 2 - 1;
  state.nPosition.y = (-state.position.y / rect.height) * 2 + 1;
}

function isInBounds(rect: DOMRect) {
  return (
    globalPointer.x >= rect.left &&
    globalPointer.x <= rect.left + rect.width &&
    globalPointer.y >= rect.top &&
    globalPointer.y <= rect.top + rect.height
  );
}

// ─── Ball physics ─────────────────────────────────────────────────────────────

const { randFloat, randFloatSpread } = MathUtils;
const pv1 = new Vector3();
const pv2 = new Vector3();
const pv3 = new Vector3();
const pv4 = new Vector3();
const pv5 = new Vector3();
const pv6 = new Vector3();
const pv7 = new Vector3();
const pv8 = new Vector3();
const pv9 = new Vector3();
const pv10 = new Vector3();

interface BallpitConfig {
  count: number;
  colors: (number | string)[];
  ambientColor: number;
  ambientIntensity: number;
  lightIntensity: number;
  materialParams: {
    metalness: number;
    roughness: number;
    clearcoat: number;
    clearcoatRoughness: number;
  };
  minSize: number;
  maxSize: number;
  size0: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  maxVelocity: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  controlSphere0: boolean;
  followCursor: boolean;
}

class BallPhysics {
  config: BallpitConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center: Vector3;

  constructor(config: BallpitConfig) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.center = new Vector3();
    this.init();
    this.setSizes();
  }

  private init() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const b = 3 * i;
      positionData[b] = randFloatSpread(2 * config.maxX);
      positionData[b + 1] = randFloatSpread(2 * config.maxY);
      positionData[b + 2] = randFloatSpread(2 * config.maxZ);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = randFloat(config.minSize, config.maxSize);
    }
  }

  update(frame: { delta: number }) {
    const {
      config,
      center,
      positionData: pos,
      sizeData: sizes,
      velocityData: vel,
    } = this;
    let start = 0;
    if (config.controlSphere0) {
      start = 1;
      pv1.fromArray(pos, 0).lerp(center, 0.1).toArray(pos, 0);
      pv4.set(0, 0, 0).toArray(vel, 0);
    }
    for (let i = start; i < config.count; i++) {
      const b = 3 * i;
      pv2.fromArray(pos, b);
      pv5.fromArray(vel, b);
      pv5.y -= frame.delta * config.gravity * sizes[i];
      pv5.multiplyScalar(config.friction).clampLength(0, config.maxVelocity);
      pv2.add(pv5).toArray(pos, b);
      pv5.toArray(vel, b);
    }
    for (let i = start; i < config.count; i++) {
      const b = 3 * i;
      pv2.fromArray(pos, b);
      pv5.fromArray(vel, b);
      const r = sizes[i];
      for (let j = i + 1; j < config.count; j++) {
        const ob = 3 * j;
        pv3.fromArray(pos, ob);
        pv6.fromArray(vel, ob);
        const or = sizes[j];
        pv7.copy(pv3).sub(pv2);
        const dist = pv7.length();
        const sr = r + or;
        if (dist < sr) {
          const overlap = sr - dist;
          pv8
            .copy(pv7)
            .normalize()
            .multiplyScalar(0.5 * overlap);
          pv9.copy(pv8).multiplyScalar(Math.max(pv5.length(), 1));
          pv10.copy(pv8).multiplyScalar(Math.max(pv6.length(), 1));
          pv2.sub(pv8).toArray(pos, b);
          pv5.sub(pv9).toArray(vel, b);
          pv3.add(pv8).toArray(pos, ob);
          pv6.add(pv10).toArray(vel, ob);
        }
      }
      if (config.controlSphere0) {
        pv7.copy(pv1).sub(pv2);
        const dist = pv7.length();
        const sr0 = r + sizes[0];
        if (dist < sr0) {
          const diff = sr0 - dist;
          pv8.copy(pv7.normalize()).multiplyScalar(diff);
          pv9.copy(pv8).multiplyScalar(Math.max(pv5.length(), 2));
          pv2.sub(pv8);
          pv5.sub(pv9);
        }
      }
      if (Math.abs(pv2.x) + r > config.maxX) {
        pv2.x = Math.sign(pv2.x) * (config.maxX - r);
        pv5.x = -pv5.x * config.wallBounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(pv2.y) + r > config.maxY) {
          pv2.y = Math.sign(pv2.y) * (config.maxY - r);
          pv5.y = -pv5.y * config.wallBounce;
        }
      } else if (pv2.y - r < -config.maxY) {
        pv2.y = -config.maxY + r;
        pv5.y = -pv5.y * config.wallBounce;
      }
      const maxB = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(pv2.z) + r > maxB) {
        pv2.z = Math.sign(pv2.z) * (config.maxZ - r);
        pv5.z = -pv5.z * config.wallBounce;
      }
      pv2.toArray(pos, b);
      pv5.toArray(vel, b);
    }
  }
}

// ─── Subsurface material ──────────────────────────────────────────────────────

class SubsurfaceMaterial extends MeshPhysicalMaterial {
  ssUniforms: Record<string, { value: number }>;
  onBeforeCompile2?: (shader: {
    fragmentShader: string;
    uniforms: Record<string, unknown>;
  }) => void;

  constructor(params: ConstructorParameters<typeof MeshPhysicalMaterial>[0]) {
    super(params);
    this.ssUniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 },
    };
    (this.defines as Record<string, string>).USE_UV = "";
    this.onBeforeCompile = (shader: {
      fragmentShader: string;
      uniforms: Record<string, unknown>;
    }) => {
      Object.assign(shader.uniforms, this.ssUniforms);
      shader.fragmentShader = `\n        uniform float thicknessPower;\n        uniform float thicknessScale;\n        uniform float thicknessDistortion;\n        uniform float thicknessAmbient;\n        uniform float thicknessAttenuation;\n      ${shader.fragmentShader}`;
      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        "\n        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\n          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\n          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\n          #ifdef USE_COLOR\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\n          #else\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\n          #endif\n          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\n        }\n\n        void main() {\n      ",
      );
      const replaced = ShaderChunk.lights_fragment_begin.replaceAll(
        "RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",
        "\n          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\n        ",
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <lights_fragment_begin>",
        replaced,
      );
      if (this.onBeforeCompile2) this.onBeforeCompile2(shader);
    };
  }
}

// ─── BallpitMesh ─────────────────────────────────────────────────────────────

const defaultConfig: BallpitConfig = {
  count: 200,
  colors: [0, 0, 0],
  ambientColor: 0xffffff,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true,
};

const dummyObj = new Object3D();

class BallpitMesh extends InstancedMesh {
  config: BallpitConfig;
  physics: BallPhysics;
  ambientLight: AmbientLight;
  pointLight: PointLight;

  constructor(renderer: WebGLRenderer, opts: Partial<BallpitConfig> = {}) {
    const config: BallpitConfig = { ...defaultConfig, ...opts };
    const envTexture = new PMREMGenerator(renderer).fromScene(
      new RoomEnvironment(),
    ).texture;
    const material = new SubsurfaceMaterial({
      envMap: envTexture,
      ...config.materialParams,
    });
    material.envMapRotation.x = -Math.PI / 2;
    super(new SphereGeometry(), material, config.count);
    this.config = config;
    this.physics = new BallPhysics(config);
    this.ambientLight = new AmbientLight(
      config.ambientColor,
      config.ambientIntensity,
    );
    this.pointLight = new PointLight(
      config.colors[0] as number,
      config.lightIntensity,
    );
    this.add(this.ambientLight);
    this.add(this.pointLight);
    this.setColors(config.colors);
  }

  setColors(colors: (number | string)[]) {
    if (!Array.isArray(colors) || colors.length < 2) return;
    const objs = colors.map((c) => new Color(c));
    const getAt = (ratio: number, out = new Color()) => {
      const scaled = Math.max(0, Math.min(1, ratio)) * (colors.length - 1);
      const idx = Math.floor(scaled);
      const s = objs[idx];
      if (idx >= colors.length - 1) return s.clone();
      const alpha = scaled - idx;
      const e = objs[idx + 1];
      out.r = s.r + alpha * (e.r - s.r);
      out.g = s.g + alpha * (e.g - s.g);
      out.b = s.b + alpha * (e.b - s.b);
      return out;
    };
    for (let i = 0; i < this.count; i++) {
      this.setColorAt(i, getAt(i / this.count));
      if (i === 0) this.pointLight.color.copy(getAt(0));
    }
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  update(frame: { delta: number }) {
    this.physics.update(frame);
    for (let i = 0; i < this.count; i++) {
      dummyObj.position.fromArray(this.physics.positionData, 3 * i);
      dummyObj.scale.setScalar(
        i === 0 && !this.config.followCursor ? 0 : this.physics.sizeData[i],
      );
      dummyObj.updateMatrix();
      this.setMatrixAt(i, dummyObj.matrix);
      if (i === 0) this.pointLight.position.copy(dummyObj.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

// ─── createBallpit factory ────────────────────────────────────────────────────

interface BallpitInstance {
  three: ThreeApp;
  readonly spheres: BallpitMesh;
  setCount: (n: number) => void;
  togglePause: () => void;
  dispose: () => void;
}

function createBallpit(
  canvas: HTMLCanvasElement,
  opts: Partial<BallpitConfig> = {},
): BallpitInstance {
  const app = new ThreeApp({
    canvas,
    size: "parent",
    rendererOptions: { antialias: true, alpha: true },
  });
  app.renderer.toneMapping = ACESFilmicToneMapping;
  app.camera.position.set(0, 0, 20);
  app.camera.lookAt(0, 0, 0);
  app.cameraMaxAspect = 1.5;
  app.resize();

  let spheres: BallpitMesh;
  let paused = false;

  canvas.style.touchAction = "none";
  canvas.style.userSelect = "none";
  (
    canvas.style as CSSStyleDeclaration & { webkitUserSelect: string }
  ).webkitUserSelect = "none";

  const raycaster = new Raycaster();
  const hitPlane = new Plane(new Vector3(0, 0, 1), 0);
  const hitPoint = new Vector3();

  const pointer = createPointer({
    domElement: canvas,
    onMove(state) {
      raycaster.setFromCamera(state.nPosition, app.camera);
      app.camera.getWorldDirection(hitPlane.normal);
      raycaster.ray.intersectPlane(hitPlane, hitPoint);
      spheres.physics.center.copy(hitPoint);
      spheres.config.controlSphere0 = true;
    },
    onLeave() {
      spheres.config.controlSphere0 = false;
    },
  });

  function init(config: Partial<BallpitConfig>) {
    if (spheres) {
      app.clear();
      app.scene.remove(spheres);
    }
    spheres = new BallpitMesh(app.renderer, config);
    app.scene.add(spheres);
  }

  init(opts);

  app.onBeforeRender = (frame) => {
    if (!paused) spheres.update(frame);
  };
  app.onAfterResize = (size) => {
    spheres.config.maxX = size.wWidth / 2;
    spheres.config.maxY = size.wHeight / 2;
  };

  return {
    three: app,
    get spheres() {
      return spheres;
    },
    setCount(n) {
      init({ ...spheres.config, count: n });
    },
    togglePause() {
      paused = !paused;
    },
    dispose() {
      pointer.dispose();
      app.dispose();
    },
  };
}

// ─── React component ──────────────────────────────────────────────────────────

export interface BallpitProps {
  className?: string;
  followCursor?: boolean;
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  colors?: (number | string)[];
}

const BallpitBackground = ({
  className = "",
  followCursor = false,
  count = 100,
  gravity = 0.01,
  friction = 0.9975,
  wallBounce = 0.95,
  colors = [0xa855f7, 0x3b82f6, 0x06b6d4],
}: BallpitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<BallpitInstance | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional init-once effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    instanceRef.current = createBallpit(canvas, {
      followCursor,
      count,
      gravity,
      friction,
      wallBounce,
      colors,
    });
    return () => {
      instanceRef.current?.dispose();
      instanceRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default BallpitBackground;
