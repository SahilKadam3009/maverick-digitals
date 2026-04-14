import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Linkedin, T as Twitter, I as Instagram, L as Link, B as Button } from "./index-C-4YwrUA.js";
import { u as useRevealOnScroll } from "./useIntersectionObserver-bEu3xAPU.js";
import { f as frame, d as cancelFrame, e as interpolate, g as supportsViewTimeline, h as supportsScrollTimeline, p as progress, v as velocityPerSecond, i as isHTMLElement, j as defaultOffset$1, k as clamp, n as noop, l as resize, o as frameData, u as useConstant, b as useIsomorphicLayoutEffect, q as invariant, t as motionValue, M as MotionConfigContext, w as collectMotionValues, m as motion } from "./proxy-D4PJeUjS.js";
import { A as ArrowRight } from "./arrow-right-CXAXVlXW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
];
const CodeXml = createLucideIcon("code-xml", __iconNode);
function observeTimeline(update, timeline2) {
  let prevProgress;
  const onFrame = () => {
    const { currentTime } = timeline2;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress2 = percentage / 100;
    if (prevProgress !== progress2) {
      update(progress2);
    }
    prevProgress = progress2;
  };
  frame.preUpdate(onFrame, true);
  return () => cancelFrame(onFrame);
}
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function canUseNativeTimeline(target) {
  if (typeof window === "undefined")
    return false;
  return target ? supportsViewTimeline() : supportsScrollTimeline();
}
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time) {
  const axis = info[axisName];
  const { length, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = Math.abs(element[`scroll${position}`]);
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress(0, axis.scrollLength, axis.current);
  const elapsed = time - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
  updateAxisInfo(element, "x", info, time);
  updateAxisInfo(element, "y", info, time);
  info.time = time;
}
function calcInset(element, container) {
  const inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (isHTMLElement(current)) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current.tagName === "svg") {
      const svgBoundingBox = current.getBoundingClientRect();
      current = current.parentElement;
      const parentBoundingBox = current.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current instanceof SVGGraphicsElement) {
      const { x, y } = current.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current.parentNode;
      }
      current = svg;
    } else {
      break;
    }
  }
  return inset;
}
const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  if (typeof edge === "string") {
    const asNumber = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber;
    } else if (edge.endsWith("%")) {
      edge = asNumber / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber;
    }
  }
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
const ScrollOffset = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
};
const point = { x: 0, y: 0 };
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
  const { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged) {
    info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: (time) => {
      measure(element, options.target, info);
      updateScrollInfo(element, info, time);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const scrollSize = /* @__PURE__ */ new WeakMap();
const dimensionCheckProcesses = /* @__PURE__ */ new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, trackContentSize = false, ...options } = {}) {
  if (!container)
    return noop;
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers) {
        handler.measure(frameData.timestamp);
      }
      frame.preUpdate(notifyAll);
    };
    const notifyAll = () => {
      for (const handler of containerHandlers) {
        handler.notify();
      }
    };
    const listener2 = () => frame.read(measureAll);
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2);
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2);
    listener2();
  }
  if (trackContentSize && !dimensionCheckProcesses.has(container)) {
    const listener2 = scrollListeners.get(container);
    const size = {
      width: container.scrollWidth,
      height: container.scrollHeight
    };
    scrollSize.set(container, size);
    const checkScrollDimensions = () => {
      const newWidth = container.scrollWidth;
      const newHeight = container.scrollHeight;
      if (size.width !== newWidth || size.height !== newHeight) {
        listener2();
        size.width = newWidth;
        size.height = newHeight;
      }
    };
    const dimensionCheckProcess = frame.read(checkScrollDimensions, true);
    dimensionCheckProcesses.set(container, dimensionCheckProcess);
  }
  const listener = scrollListeners.get(container);
  frame.read(listener, false, true);
  return () => {
    var _a;
    cancelFrame(listener);
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers)
      return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size)
      return;
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      (_a = resizeListeners.get(container)) == null ? void 0 : _a();
      window.removeEventListener("resize", scrollListener);
    }
    const dimensionCheckProcess = dimensionCheckProcesses.get(container);
    if (dimensionCheckProcess) {
      cancelFrame(dimensionCheckProcess);
      dimensionCheckProcesses.delete(container);
    }
    scrollSize.delete(container);
  };
}
const presets = [
  [ScrollOffset.Enter, "entry"],
  [ScrollOffset.Exit, "exit"],
  [ScrollOffset.Any, "cover"],
  [ScrollOffset.All, "contain"]
];
const stringToProgress = {
  start: 0,
  end: 1
};
function parseStringOffset(s) {
  const parts = s.trim().split(/\s+/);
  if (parts.length !== 2)
    return void 0;
  const a = stringToProgress[parts[0]];
  const b = stringToProgress[parts[1]];
  if (a === void 0 || b === void 0)
    return void 0;
  return [a, b];
}
function normaliseOffset(offset) {
  if (offset.length !== 2)
    return void 0;
  const result = [];
  for (const item of offset) {
    if (Array.isArray(item)) {
      result.push(item);
    } else if (typeof item === "string") {
      const parsed = parseStringOffset(item);
      if (!parsed)
        return void 0;
      result.push(parsed);
    } else {
      return void 0;
    }
  }
  return result;
}
function matchesPreset(offset, preset) {
  const normalised = normaliseOffset(offset);
  if (!normalised)
    return false;
  for (let i = 0; i < 2; i++) {
    const o = normalised[i];
    const p = preset[i];
    if (o[0] !== p[0] || o[1] !== p[1])
      return false;
  }
  return true;
}
function offsetToViewTimelineRange(offset) {
  if (!offset) {
    return { rangeStart: "contain 0%", rangeEnd: "contain 100%" };
  }
  for (const [preset, name] of presets) {
    if (matchesPreset(offset, preset)) {
      return { rangeStart: `${name} 0%`, rangeEnd: `${name} 100%` };
    }
  }
  return void 0;
}
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[options.axis].progress * 100;
  }, options);
  return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
  const { axis } = options;
  if (source)
    container = source;
  let containerCache = timelineCache.get(container);
  if (!containerCache) {
    containerCache = /* @__PURE__ */ new Map();
    timelineCache.set(container, containerCache);
  }
  const targetKey = options.target ?? "self";
  let targetCache = containerCache.get(targetKey);
  if (!targetCache) {
    targetCache = {};
    containerCache.set(targetKey, targetCache);
  }
  const axisKey = axis + (options.offset ?? []).join(",");
  if (!targetCache[axisKey]) {
    if (options.target && canUseNativeTimeline(options.target)) {
      const range = offsetToViewTimelineRange(options.offset);
      if (range) {
        targetCache[axisKey] = new ViewTimeline({
          subject: options.target,
          axis
        });
      } else {
        targetCache[axisKey] = scrollTimelineFallback({
          container,
          ...options
        });
      }
    } else if (canUseNativeTimeline()) {
      targetCache[axisKey] = new ScrollTimeline({
        source: container,
        axis
      });
    } else {
      targetCache[axisKey] = scrollTimelineFallback({
        container,
        ...options
      });
    }
  }
  return targetCache[axisKey];
}
function attachToAnimation(animation, options) {
  const timeline2 = getTimeline(options);
  const range = options.target ? offsetToViewTimelineRange(options.offset) : void 0;
  const useNative = options.target ? canUseNativeTimeline(options.target) && !!range : canUseNativeTimeline();
  return animation.attachTimeline({
    timeline: useNative ? timeline2 : void 0,
    ...range && useNative && {
      rangeStart: range.rangeStart,
      rangeEnd: range.rangeEnd
    },
    observe: (valueAnimation) => {
      valueAnimation.pause();
      return observeTimeline((progress2) => {
        valueAnimation.time = valueAnimation.iterationDuration * progress2;
      }, timeline2);
    }
  });
}
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  const optionsWithDefaults = { axis, container, ...options };
  return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
const createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
});
const isRefPending = (ref) => {
  if (!ref)
    return false;
  return !ref.current;
};
function makeAccelerateConfig(axis, options, container, target) {
  return {
    factory: (animation) => scroll(animation, {
      ...options,
      axis,
      container: (container == null ? void 0 : container.current) || void 0,
      target: (target == null ? void 0 : target.current) || void 0
    }),
    times: [0, 1],
    keyframes: [0, 1],
    ease: (v) => v,
    duration: 1
  };
}
function canAccelerateScroll(target, offset) {
  if (typeof window === "undefined")
    return false;
  return target ? supportsViewTimeline() && !!offsetToViewTimelineRange(offset) : supportsScrollTimeline();
}
function useScroll({ container, target, ...options } = {}) {
  const values = useConstant(createScrollMotionValues);
  if (canAccelerateScroll(target, options.offset)) {
    values.scrollXProgress.accelerate = makeAccelerateConfig("x", options, container, target);
    values.scrollYProgress.accelerate = makeAccelerateConfig("y", options, container, target);
  }
  const scrollAnimation = reactExports.useRef(null);
  const needsStart = reactExports.useRef(false);
  const start = reactExports.useCallback(() => {
    scrollAnimation.current = scroll((_progress, { x, y }) => {
      values.scrollX.set(x.current);
      values.scrollXProgress.set(x.progress);
      values.scrollY.set(y.current);
      values.scrollYProgress.set(y.progress);
    }, {
      ...options,
      container: (container == null ? void 0 : container.current) || void 0,
      target: (target == null ? void 0 : target.current) || void 0
    });
    return () => {
      var _a;
      (_a = scrollAnimation.current) == null ? void 0 : _a.call(scrollAnimation);
    };
  }, [container, target, JSON.stringify(options.offset)]);
  useIsomorphicLayoutEffect(() => {
    needsStart.current = false;
    if (isRefPending(container) || isRefPending(target)) {
      needsStart.current = true;
      return;
    } else {
      return start();
    }
  }, [start]);
  reactExports.useEffect(() => {
    if (needsStart.current) {
      invariant(!isRefPending(container));
      invariant(!isRefPending(target));
      return start();
    } else {
      return;
    }
  }, [start]);
  return values;
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const isOutputMap = outputRangeOrMap !== void 0 && !Array.isArray(outputRangeOrMap) && typeof inputRangeOrTransformer !== "function";
  if (isOutputMap) {
    return useMapTransform(input, inputRangeOrTransformer, outputRangeOrMap, options);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useMapTransform(inputValue, inputRange, outputMap, options) {
  const keys2 = useConstant(() => Object.keys(outputMap));
  const output = useConstant(() => ({}));
  for (const key of keys2) {
    output[key] = useTransform(inputValue, inputRange, outputMap[key], options);
  }
  return output;
}
function GalaxyCanvas() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a, _b;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = ((_a = canvas.parentElement) == null ? void 0 : _a.offsetWidth) ?? window.innerWidth;
    canvas.height = ((_b = canvas.parentElement) == null ? void 0 : _b.offsetHeight) ?? 900;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId;
    let width = canvas.width;
    let height = canvas.height;
    const stars = Array.from({ length: 320 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.4,
      baseOpacity: Math.random() * 0.9 + 0.3,
      opacity: 0,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.01
    }));
    const nebulaColors = [
      "168,85,247",
      "6,182,212",
      "99,102,241",
      "192,132,252",
      "34,211,238",
      "139,92,246",
      "56,189,248",
      "167,139,250"
    ];
    const nebulas = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 130 + Math.random() * 220,
      color: nebulaColors[i % nebulaColors.length],
      opacity: 0.3 + Math.random() * 0.2,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.14,
      phase: Math.random() * Math.PI * 2
    }));
    const meteors = Array.from({ length: 6 }, () => ({
      x: 0,
      y: 0,
      len: 0,
      speed: 0,
      angle: 0,
      opacity: 0,
      active: false,
      life: 0,
      maxLife: 1
    }));
    let lastMeteorTime = 0;
    function spawnMeteor(m) {
      m.x = Math.random() * width * 1.2 - width * 0.1;
      m.y = Math.random() * height * 0.5;
      m.len = 100 + Math.random() * 160;
      m.speed = 8 + Math.random() * 10;
      m.angle = Math.PI / 5 + Math.random() * (Math.PI / 8);
      m.opacity = 0.9 + Math.random() * 0.1;
      m.maxLife = m.len / m.speed;
      m.life = 0;
      m.active = true;
    }
    let t = 0;
    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.95
      );
      bgGrad.addColorStop(0, "rgba(22,10,50,1)");
      bgGrad.addColorStop(0.35, "rgba(14,7,34,1)");
      bgGrad.addColorStop(0.7, "rgba(8,4,20,1)");
      bgGrad.addColorStop(1, "rgba(4,2,12,1)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      const blob1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.25,
        0,
        width * 0.2,
        height * 0.25,
        width * 0.55
      );
      blob1.addColorStop(0, "rgba(168,85,247,0.32)");
      blob1.addColorStop(0.5, "rgba(168,85,247,0.12)");
      blob1.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = blob1;
      ctx.fillRect(0, 0, width, height);
      const blob2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.75,
        0,
        width * 0.8,
        height * 0.75,
        width * 0.45
      );
      blob2.addColorStop(0, "rgba(6,182,212,0.28)");
      blob2.addColorStop(0.5, "rgba(6,182,212,0.10)");
      blob2.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = blob2;
      ctx.fillRect(0, 0, width, height);
      const blob3 = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        width * 0.38
      );
      blob3.addColorStop(0, "rgba(99,102,241,0.22)");
      blob3.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = blob3;
      ctx.fillRect(0, 0, width, height);
      for (const n of nebulas) {
        n.x += n.dx;
        n.y += n.dy;
        n.phase += 4e-3;
        if (n.x < -n.r) n.x = width + n.r;
        if (n.x > width + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = height + n.r;
        if (n.y > height + n.r) n.y = -n.r;
        const pulsedR = n.r * (1 + 0.12 * Math.sin(n.phase));
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulsedR);
        const pulse = n.opacity * (0.82 + 0.18 * Math.sin(n.phase * 2));
        grad.addColorStop(0, `rgba(${n.color},${pulse})`);
        grad.addColorStop(0.38, `rgba(${n.color},${pulse * 0.38})`);
        grad.addColorStop(1, `rgba(${n.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulsedR, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const s of stars) {
        s.phase += s.twinkleSpeed;
        s.opacity = s.baseOpacity * (0.3 + 0.7 * Math.sin(s.phase));
        if (s.opacity < 0.05) continue;
        const pulse = s.r * (1 + 0.35 * Math.sin(s.phase * 1.5));
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, pulse * 5);
        glow.addColorStop(0, `rgba(220,200,255,${s.opacity * 0.45})`);
        glow.addColorStop(1, "rgba(220,200,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, pulse * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(s.x, s.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,235,255,${s.opacity})`;
        ctx.fill();
      }
      const now = t;
      if (now - lastMeteorTime > 1.5 + Math.random() * 2.5) {
        const idle = meteors.find((m) => !m.active);
        if (idle) {
          spawnMeteor(idle);
          lastMeteorTime = now;
        }
      }
      for (const m of meteors) {
        if (!m.active) continue;
        m.life += 1;
        const progress2 = m.life / m.maxLife;
        const tailX = m.x + Math.cos(m.angle) * m.len;
        const tailY = m.y + Math.sin(m.angle) * m.len;
        const fade = progress2 < 0.2 ? progress2 / 0.2 : 1 - (progress2 - 0.2) / 0.8;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${m.opacity * fade})`);
        grad.addColorStop(0.3, `rgba(200,180,255,${m.opacity * fade * 0.65})`);
        grad.addColorStop(1, "rgba(168,85,247,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        if (m.life >= m.maxLife || m.x > width + 50 || m.y > height + 50)
          m.active = false;
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    const handleResize = () => {
      var _a2, _b2;
      if (!canvas) return;
      width = ((_a2 = canvas.parentElement) == null ? void 0 : _a2.offsetWidth) ?? window.innerWidth;
      height = ((_b2 = canvas.parentElement) == null ? void 0 : _b2.offsetHeight) ?? 900;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block"
      }
    }
  );
}
const teamMembers = [
  {
    name: "Muskan Rathod",
    initials: "MR",
    title: "Founder",
    bio: "Brand strategist & growth marketer, expert in storytelling, personal branding, and scaling businesses with digital-first positioning.",
    skills: [
      "Brand Strategy",
      "Growth Marketing",
      "Storytelling",
      "Personal Branding"
    ],
    photo: "/assets/muskan-rathod.png",
    badgeIcon: Award,
    badgeColor: "from-primary to-accent",
    accentColor: "border-primary/30",
    socials: [
      {
        icon: Linkedin,
        href: "https://linkedin.com",
        label: "LinkedIn",
        color: "hover:text-blue-400"
      },
      {
        icon: Twitter,
        href: "https://twitter.com",
        label: "Twitter",
        color: "hover:text-sky-400"
      },
      {
        icon: Instagram,
        href: "https://instagram.com",
        label: "Instagram",
        color: "hover:text-pink-400"
      }
    ]
  },
  {
    name: "Dhaval Shah",
    initials: "DS",
    title: "Co-Founder",
    bio: "Tech innovator with 5+ years in scalable web and app development, specializing in building conversion-optimized digital platforms.",
    skills: [
      "Web Development",
      "App Development",
      "MERN Stack",
      "Platform Optimization"
    ],
    photo: "/assets/dhaval-shah.png",
    badgeIcon: CodeXml,
    badgeColor: "from-accent to-secondary",
    accentColor: "border-accent/30",
    socials: [
      {
        icon: Linkedin,
        href: "https://linkedin.com",
        label: "LinkedIn",
        color: "hover:text-blue-400"
      },
      {
        icon: Twitter,
        href: "https://twitter.com",
        label: "Twitter",
        color: "hover:text-sky-400"
      },
      {
        icon: Instagram,
        href: "https://instagram.com",
        label: "Instagram",
        color: "hover:text-pink-400"
      }
    ]
  }
];
const timeline = [
  {
    year: "2021",
    event: "Founded Maverick Digitals",
    desc: "Born from a vision to help brands break through the noise."
  },
  {
    year: "2022",
    event: "First 10 Clients",
    desc: "Early believers who became our loudest advocates."
  },
  {
    year: "2023",
    event: "$1M Revenue Milestone",
    desc: "Crossed the first million with pure strategy and zero fluff."
  },
  {
    year: "2024",
    event: "50+ Brands Scaled",
    desc: "From startups to industry leaders — every brand transformed."
  },
  {
    year: "2025",
    event: "Global Expansion",
    desc: "Expanding reach across markets to shape digital culture worldwide."
  }
];
const storyParagraphs = [
  "It started with a frustration. Muskan had spent years watching brilliant businesses pour money into marketing that felt hollow — campaigns without soul, content without conviction, strategies copy-pasted from a competitor's playbook.",
  "She knew there was a better way. One that started with the story first, then amplified it with data. One that treated every brand as a living entity with its own voice, values, and velocity.",
  "In 2021, she founded Maverick Digitals with a single promise: to build brands that don't just compete — they define the category. No templates. No shortcuts. Just obsessive, handcrafted marketing strategy built for the long game.",
  "Three years in, the results speak for themselves. 50+ brands scaled, millions in revenue generated, and a growing community of founders who believe that bold storytelling is the highest-leverage marketing tool in existence."
];
const stats = [
  { value: "50+", label: "Brands Scaled" },
  { value: "3M+", label: "Reach Generated" },
  { value: "$10M+", label: "Revenue Driven" }
];
function CardParticles({ isMuskan }) {
  const color = isMuskan ? "rgba(168,85,247," : "rgba(34,211,238,";
  const particles = [
    { top: "15%", left: "-8%", size: 5, delay: 0, duration: 3.2 },
    { top: "60%", left: "-6%", size: 3.5, delay: 0.8, duration: 4.1 },
    {
      top: "30%",
      right: "-7%",
      left: void 0,
      size: 4,
      delay: 0.4,
      duration: 3.7
    },
    {
      top: "75%",
      right: "-9%",
      left: void 0,
      size: 3,
      delay: 1.2,
      duration: 4.5
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute rounded-full pointer-events-none",
      style: {
        width: p.size,
        height: p.size,
        top: p.top,
        left: p.left,
        right: p.right,
        background: `${color}0.7)`,
        boxShadow: `0 0 ${p.size * 3}px ${color}0.6)`,
        zIndex: 20
      },
      animate: { y: [-6, 6, -6], opacity: [0.5, 1, 0.5] },
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: p.duration,
        delay: p.delay,
        ease: "easeInOut"
      }
    },
    p.delay
  )) });
}
function CircularPhoto({
  src,
  alt,
  initials,
  isMuskan
}) {
  const [imgError, setImgError] = reactExports.useState(false);
  const ringColor = isMuskan ? "168,85,247" : "34,211,238";
  const borderColor = isMuskan ? "#a855f7" : "#06b6d4";
  const shadowGlow = isMuskan ? "0 0 0 3px #a855f7, 0 0 25px rgba(168,85,247,0.7), 0 0 55px rgba(124,58,237,0.4)" : "0 0 0 3px #06b6d4, 0 0 25px rgba(6,182,212,0.7), 0 0 55px rgba(8,145,178,0.4)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: 240, height: 240 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute rounded-full pointer-events-none",
            style: {
              width: 240,
              height: 240,
              border: `1.5px solid rgba(${ringColor},0.18)`,
              borderRadius: "50%"
            },
            animate: {
              scale: [1, 1.18, 1],
              opacity: [0.12, 0.32, 0.12]
            },
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 4.8,
              ease: "easeInOut",
              delay: 0.6
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute rounded-full pointer-events-none",
            style: {
              width: 228,
              height: 228,
              border: `1.5px solid rgba(${ringColor},0.28)`,
              borderRadius: "50%"
            },
            animate: {
              scale: [1, 1.1, 1],
              opacity: [0.22, 0.55, 0.22]
            },
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 3.4,
              ease: "easeInOut"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 220,
              height: 220,
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${borderColor}`,
              boxShadow: shadowGlow,
              flexShrink: 0,
              position: "relative",
              zIndex: 2
            },
            children: !imgError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src,
                alt,
                onError: () => setImgError(true),
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block"
                }
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: "100%",
                  height: "100%",
                  background: isMuskan ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "linear-gradient(135deg, #0891b2, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "#fff"
                },
                children: initials
              }
            )
          }
        )
      ]
    }
  );
}
function FounderCard({ member, index }) {
  const BadgeIcon = member.badgeIcon;
  const isMuskan = index === 0;
  const glowPrimary = isMuskan ? "rgba(168,85,247," : "rgba(34,211,238,";
  const glowSoft = isMuskan ? "rgba(168,85,247,0.18)" : "rgba(34,211,238,0.18)";
  const glowStrong = isMuskan ? "rgba(168,85,247,0.55)" : "rgba(34,211,238,0.55)";
  const gradientText = isMuskan ? "linear-gradient(135deg, #c084fc, #ffffff)" : "linear-gradient(135deg, #22d3ee, #ffffff)";
  const cornerColor = isMuskan ? "rgba(168,85,247,0.8)" : "rgba(34,211,238,0.8)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 50, scale: 0.96 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      whileHover: { y: -6, scale: 1.02 },
      viewport: { once: true },
      transition: {
        delay: index * 0.18,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1]
      },
      className: "relative flex flex-col overflow-hidden",
      style: {
        background: "rgba(255,255,255,0.032)",
        backdropFilter: "blur(24px)",
        borderRadius: "1.5rem",
        border: `1px solid ${glowSoft}`,
        boxShadow: `0 0 32px ${glowPrimary}0.22), 0 0 64px ${glowPrimary}0.10), 0 20px 60px rgba(0,0,0,0.6)`,
        transition: "box-shadow 0.4s ease, border-color 0.4s ease"
      },
      "data-ocid": `founder-card-${member.initials.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardParticles, { isMuskan }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
              zIndex: 5,
              borderRadius: "1.5rem"
            },
            initial: { x: "-100%" },
            animate: { x: "200%" },
            transition: {
              delay: index * 0.2 + 0.5,
              duration: 1.2,
              ease: "easeInOut"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: 40,
              height: 2,
              background: `linear-gradient(to right, ${cornerColor}, transparent)`,
              borderRadius: "0 0 2px 0",
              zIndex: 10
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: 2,
              height: 40,
              background: `linear-gradient(to bottom, ${cornerColor}, transparent)`,
              borderRadius: "0 0 2px 0",
              zIndex: 10
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 40,
              height: 2,
              background: `linear-gradient(to left, ${cornerColor}, transparent)`,
              zIndex: 10
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 2,
              height: 40,
              background: `linear-gradient(to top, ${cornerColor}, transparent)`,
              zIndex: 10
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 1,
              borderRadius: "calc(1.5rem - 1px)",
              border: "1px solid rgba(255,255,255,0.07)",
              pointerEvents: "none",
              zIndex: 2
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: isMuskan ? "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 65%)" : "radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.07) 0%, transparent 65%)",
              borderRadius: "1.5rem",
              zIndex: 1
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative w-full flex flex-col items-center",
              style: {
                background: isMuskan ? "linear-gradient(180deg, rgba(168,85,247,0.10) 0%, rgba(99,102,241,0.04) 100%)" : "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, rgba(6,182,212,0.03) 100%)",
                borderRadius: "1.5rem 1.5rem 0 0",
                paddingTop: "2.5rem",
                paddingBottom: "1.5rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircularPhoto,
                  {
                    src: member.photo,
                    alt: `${member.name} — ${member.title}, Maverick Digitals`,
                    initials: member.initials,
                    isMuskan
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `relative mt-[-20px] w-11 h-11 rounded-full bg-gradient-to-br ${member.badgeColor} flex items-center justify-center shadow-lg`,
                    style: {
                      border: "3px solid rgba(8,4,20,0.9)",
                      boxShadow: `0 0 16px ${glowStrong}`,
                      zIndex: 5
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeIcon, { size: 18, className: "text-background" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-7 pb-8 pt-5 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display font-bold text-2xl mb-2 tracking-tight",
                  style: {
                    background: gradientText,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  },
                  children: member.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full",
                  style: {
                    background: isMuskan ? "rgba(168,85,247,0.14)" : "rgba(34,211,238,0.12)",
                    border: `1px solid ${isMuskan ? "rgba(168,85,247,0.45)" : "rgba(34,211,238,0.40)"}`,
                    color: isMuskan ? "rgba(192,132,252,1)" : "rgba(34,211,238,1)"
                  },
                  children: member.title
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-5 text-[14.5px] text-center", children: member.bio }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-5 justify-center", children: member.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                whileHover: { scale: 1.07, borderColor: glowStrong },
                className: "text-xs font-medium px-3 py-1 rounded-full cursor-default transition-all duration-200",
                style: {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)"
                },
                children: skill
              },
              skill
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-center gap-3 pt-5 border-t",
                style: { borderColor: "rgba(255,255,255,0.07)" },
                children: [
                  member.socials.map(({ icon: Icon, href, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": label,
                      className: `w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground ${color} hover:scale-110 transition-all duration-200`,
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)"
                      },
                      "data-ocid": `${member.initials.toLowerCase()}-social-${label.toLowerCase()}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15 })
                    },
                    label
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs ml-2 opacity-60", children: "Follow the journey" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function TimelineItem({
  item,
  index,
  isLast
}) {
  const { ref, style } = useRevealOnScroll(index * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      style,
      className: "relative flex gap-6",
      children: [
        !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-primary/40 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-shrink-0 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full glassmorphic border-primary/40 flex items-center justify-center glow-neon", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full gradient-neon-purple" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-10 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-sm", children: item.year }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-px bg-primary/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground", children: item.event })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.desc })
        ] })
      ]
    }
  );
}
function StatBadge({
  stat,
  index
}) {
  const { ref, style } = useRevealOnScroll(index * 80);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      style,
      className: "flex flex-col items-center glassmorphic border-primary/20 px-8 py-6 hover:border-primary/40 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-4xl gradient-text-purple mb-1", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm text-center", children: stat.label })
      ]
    }
  );
}
function About() {
  const heroRef = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { ref: missionRef, style: missionStyle } = useRevealOnScroll(0);
  const { ref: ctaRef, style: ctaStyle } = useRevealOnScroll(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: heroRef,
        className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
        "data-ocid": "about-hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-30 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[180px] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              style: { y: heroY, opacity: heroOpacity },
              className: "relative z-10 text-center px-6 max-w-4xl mx-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.2, duration: 0.6 },
                    className: "text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6",
                    children: "The Maverick Story"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    className: "font-display font-bold text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] tracking-tight mb-8",
                    children: [
                      "The Mind",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Behind" }),
                      " The",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Brand"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 24 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.7, duration: 0.6 },
                    className: "text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto",
                    children: "One woman. One vision. Fifty brands transformed. Discover the story behind Maverick Digitals and the strategist who dares to think differently."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: 1, scaleX: 1 },
                    transition: { delay: 1.1, duration: 0.8 },
                    className: "mt-12 w-16 h-px gradient-neon-purple mx-auto"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.5 },
              className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-widest", children: "Scroll" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: { y: [0, 8, 0] },
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      ease: "easeInOut"
                    },
                    className: "w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-28 overflow-hidden",
        style: { minHeight: "800px", background: "#060210" },
        "data-ocid": "about-founder",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: { zIndex: 0 },
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(GalaxyCanvas, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(6,2,16,0.25) 100%)",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 50% 40% at 50% 55%, rgba(168,85,247,0.06) 0%, transparent 70%)",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-6", style: { zIndex: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6 },
                className: "text-center mb-16",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4", children: "The Visionaries" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4", children: [
                    "Meet the",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Minds Behind" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    "the Maverick"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-xl mx-auto", children: "Two visionaries. One mission — to build brands that don't just compete, they define the category." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch", children: [
              teamMembers.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FounderCard, { member, index: i }, member.name)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px",
                  style: {
                    height: "70%",
                    background: "linear-gradient(to bottom, transparent, rgba(168,85,247,0.35) 30%, rgba(34,211,238,0.35) 70%, transparent)",
                    zIndex: 20
                  }
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-24 bg-card/40 overflow-hidden",
        "data-ocid": "about-story",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-20 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.7 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-center", children: "The Journey" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl md:text-5xl text-foreground text-center mb-10 leading-tight", children: [
                    "How a rebel marketer",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan", children: "changed the game" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 text-[16px] text-muted-foreground leading-[1.85]", children: storyParagraphs.map((para, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.12, duration: 0.6 },
                children: para
              },
              para.slice(0, 20)
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-28 overflow-hidden",
        "data-ocid": "about-mission",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-primary/4 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: missionRef,
              style: missionStyle,
              className: "max-w-5xl mx-auto px-6 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6", children: "Our Mission" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "We don't just market brands." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "We build icons." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mt-8 max-w-2xl mx-auto leading-relaxed", children: "Every strategy, every campaign, every word is engineered to position your brand at the forefront of culture — not just the front page of search results." })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 border-y border-border/40",
        "data-ocid": "about-stats",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatBadge, { stat, index: i }, stat.label)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-28 overflow-hidden",
        "data-ocid": "about-timeline",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -30 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.7 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-4", children: "Our History" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6", children: [
                    "Five years of",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan", children: "bold moves" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed max-w-sm", children: "Every milestone earned through relentless execution, authentic storytelling, and an unwavering belief in brands worth building." })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: timeline.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              TimelineItem,
              {
                item,
                index: i,
                isLast: i === timeline.length - 1
              },
              item.year
            )) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-28 overflow-hidden", "data-ocid": "about-cta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: ctaRef,
          style: ctaStyle,
          className: "relative z-10 max-w-3xl mx-auto px-6 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4", children: "Ready to Start?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mb-6", children: [
              "Let's Build Something",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Together" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto", children: "Your brand has a story that deserves to be told at scale. Let's make it impossible to ignore." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "gradient-neon-purple text-background font-semibold glow-neon hover:scale-105 transition-smooth border-0 px-10 h-12",
                  "data-ocid": "about-cta-primary",
                  children: [
                    "Start the Conversation",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-2" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/case-studies", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/60 h-12 px-8 transition-smooth",
                  "data-ocid": "about-cta-secondary",
                  children: "View Our Work"
                }
              ) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  About
};
