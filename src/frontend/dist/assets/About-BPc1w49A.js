import { r as reactExports, o, j as jsxRuntimeExports, u as useTheme, L as Link, B as Button } from "./index-DWTeTlWw.js";
import { u as useRevealOnScroll } from "./useIntersectionObserver-DETZ_JQ6.js";
import { f as frame, d as cancelFrame, e as interpolate, g as supportsViewTimeline, h as supportsScrollTimeline, p as progress, v as velocityPerSecond, i as isHTMLElement, j as defaultOffset$1, k as clamp$1, n as noop, l as resize, o as frameData, u as useConstant, b as useIsomorphicLayoutEffect, q as invariant, t as motionValue, M as MotionConfigContext, w as collectMotionValues, m as motion } from "./proxy-CgKmb2WF.js";
import { c as createLucideIcon } from "./createLucideIcon-dhI7xq9y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
];
const CodeXml = createLucideIcon("code-xml", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$2);
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
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode);
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
  info[axis].progress = clamp$1(0, 1, info[axis].interpolate(info[axis].current));
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
    const o2 = normalised[i];
    const p = preset[i];
    if (o2[0] !== p[0] || o2[1] !== p[1])
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
  const values2 = useConstant(createScrollMotionValues);
  if (canAccelerateScroll(target, options.offset)) {
    values2.scrollXProgress.accelerate = makeAccelerateConfig("x", options, container, target);
    values2.scrollYProgress.accelerate = makeAccelerateConfig("y", options, container, target);
  }
  const scrollAnimation = reactExports.useRef(null);
  const needsStart = reactExports.useRef(false);
  const start = reactExports.useCallback(() => {
    scrollAnimation.current = scroll((_progress, { x, y }) => {
      values2.scrollX.set(x.current);
      values2.scrollXProgress.set(x.progress);
      values2.scrollY.set(y.current);
      values2.scrollYProgress.set(y.progress);
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
  return values2;
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
function useCombineMotionValues(values2, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values2.map((v) => v.on("change", scheduleUpdate));
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
function useListTransform(values2, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values2, () => {
    latest.length = 0;
    const numValues = values2.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values2[i].get();
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
const DEFAULT_INNER_GRADIENT = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";
const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
};
const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => Number.parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + (tMax - tMin) * (v - fMin) / (fMax - fMin));
const ProfileCardComponent = ({
  avatarUrl = "",
  iconUrl = "",
  grainUrl = "",
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick
}) => {
  const wrapRef = reactExports.useRef(null);
  const shellRef = reactExports.useRef(null);
  const enterTimerRef = reactExports.useRef(null);
  const leaveRafRef = reactExports.useRef(null);
  const tiltEngine = reactExports.useMemo(() => {
    if (!enableTilt) return null;
    let rafId = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;
    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;
      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp(100 / width * x);
      const percentY = clamp(100 / height * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;
      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`
      };
      for (const [k, v] of Object.entries(properties))
        wrap.style.setProperty(k, v);
    };
    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1e3;
      lastTs = ts;
      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);
      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };
    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);
  const getOffsets = reactExports.useCallback((evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  }, []);
  const handlePointerMove = reactExports.useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, getOffsets]
  );
  const handlePointerEnter = reactExports.useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      shell.classList.add("active");
      shell.classList.add("entering");
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove("entering");
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, getOffsets]
  );
  const handlePointerLeave = reactExports.useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();
    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove("active");
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);
  const handleDeviceOrientation = reactExports.useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;
      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(
        centerX + gamma * mobileTiltSensitivity,
        0,
        shell.clientWidth
      );
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );
  reactExports.useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;
    shell.addEventListener("pointerenter", handlePointerEnter);
    shell.addEventListener("pointermove", handlePointerMove);
    shell.addEventListener("pointerleave", handlePointerLeave);
    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== "https:") return;
      const anyMotion = window.DeviceMotionEvent;
      if (anyMotion && typeof anyMotion.requestPermission === "function") {
        anyMotion.requestPermission().then((state) => {
          if (state === "granted") {
            window.addEventListener(
              "deviceorientation",
              handleDeviceOrientation
            );
          }
        }).catch(console.error);
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    };
    shell.addEventListener("click", handleClick);
    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);
    return () => {
      shell.removeEventListener("pointerenter", handlePointerEnter);
      shell.removeEventListener("pointermove", handlePointerMove);
      shell.removeEventListener("pointerleave", handlePointerLeave);
      shell.removeEventListener("click", handleClick);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove("entering");
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);
  const cardStyle = reactExports.useMemo(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      "--behind-glow-color": behindGlowColor ?? "rgba(125, 190, 255, 0.67)",
      "--behind-glow-size": behindGlowSize ?? "50%"
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );
  const handleContactClick = reactExports.useCallback(() => {
    onContactClick == null ? void 0 : onContactClick();
  }, [onContactClick]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: wrapRef,
      className: `pc-card-wrapper ${className}`.trim(),
      style: cardStyle,
      children: [
        behindGlowEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pc-behind" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: shellRef, className: "pc-card-shell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pc-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pc-inside", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pc-shine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pc-glare" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pc-content pc-avatar-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                className: "avatar",
                src: avatarUrl,
                alt: `${name || "User"} avatar`,
                loading: "lazy",
                onError: (e) => {
                  const t = e.target;
                  t.style.display = "none";
                }
              }
            ),
            showUserInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pc-user-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pc-user-details", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pc-mini-avatar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: miniAvatarUrl || avatarUrl,
                    alt: `${name || "User"} mini avatar`,
                    loading: "lazy",
                    onError: (e) => {
                      const t = e.target;
                      t.style.opacity = "0.5";
                      t.src = avatarUrl;
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pc-user-text", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pc-handle", children: [
                    "@",
                    handle
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pc-status", children: status })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "pc-contact-btn",
                  onClick: handleContactClick,
                  style: { pointerEvents: "auto" },
                  type: "button",
                  "aria-label": `Contact ${name || "user"}`,
                  children: contactText
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pc-content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pc-details", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: title })
          ] }) })
        ] }) }) })
      ]
    }
  );
};
const ProfileCard = o.memo(ProfileCardComponent);
function GalaxyCanvas({ isDark }) {
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
    const lightNebulaColors = [
      "180,140,240",
      // soft lavender-purple
      "80,190,220",
      // soft sky cyan
      "150,160,240",
      // soft periwinkle
      "210,170,250",
      // soft lilac
      "100,220,230",
      // soft teal
      "170,140,240",
      // soft violet
      "120,200,245",
      // soft blue
      "190,170,245"
      // soft pale purple
    ];
    const nebulas = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 130 + Math.random() * 220,
      color: nebulaColors[i % nebulaColors.length],
      lightColor: lightNebulaColors[i % lightNebulaColors.length],
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
      if (isDark) {
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
      } else {
        const bgGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.3,
          0,
          width * 0.5,
          height * 0.6,
          Math.max(width, height) * 0.95
        );
        bgGrad.addColorStop(0, "rgba(240,242,255,1)");
        bgGrad.addColorStop(0.4, "rgba(230,235,255,1)");
        bgGrad.addColorStop(0.75, "rgba(220,228,250,1)");
        bgGrad.addColorStop(1, "rgba(210,220,248,1)");
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
        blob1.addColorStop(0, "rgba(180,140,240,0.18)");
        blob1.addColorStop(0.5, "rgba(180,140,240,0.07)");
        blob1.addColorStop(1, "rgba(180,140,240,0)");
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
        blob2.addColorStop(0, "rgba(80,190,220,0.15)");
        blob2.addColorStop(0.5, "rgba(80,190,220,0.06)");
        blob2.addColorStop(1, "rgba(80,190,220,0)");
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
        blob3.addColorStop(0, "rgba(150,160,240,0.12)");
        blob3.addColorStop(1, "rgba(150,160,240,0)");
        ctx.fillStyle = blob3;
        ctx.fillRect(0, 0, width, height);
      }
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
        const baseOpacity = isDark ? n.opacity : n.opacity * 0.35;
        const pulse = baseOpacity * (0.82 + 0.18 * Math.sin(n.phase * 2));
        const colorStr = isDark ? n.color : n.lightColor;
        grad.addColorStop(0, `rgba(${colorStr},${pulse})`);
        grad.addColorStop(0.38, `rgba(${colorStr},${pulse * 0.38})`);
        grad.addColorStop(1, `rgba(${colorStr},0)`);
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
        if (isDark) {
          const glow = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            pulse * 5
          );
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
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, pulse * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,140,200,${s.opacity * 0.3})`;
          ctx.fill();
        }
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
        if (isDark) {
          grad.addColorStop(0, `rgba(255,255,255,${m.opacity * fade})`);
          grad.addColorStop(
            0.3,
            `rgba(200,180,255,${m.opacity * fade * 0.65})`
          );
          grad.addColorStop(1, "rgba(168,85,247,0)");
        } else {
          grad.addColorStop(0, `rgba(180,160,240,${m.opacity * fade * 0.4})`);
          grad.addColorStop(0.3, `rgba(160,140,220,${m.opacity * fade * 0.2})`);
          grad.addColorStop(1, "rgba(140,120,200,0)");
        }
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
  }, [isDark]);
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
    title: "Founder & Brand Strategist",
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
    title: "Co-Founder & Tech Innovator",
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
    desc: "Started with a simple question: why does marketing that looks good so rarely actually work? We set out to fix that."
  },
  {
    year: "2022",
    event: "First 10 Clients",
    desc: "Our first 10 clients believed in what we were building before the results were obvious. Most of them are still with us."
  },
  {
    year: "2023",
    event: "15M+ Organic Views",
    desc: "Hit 15 million organic views across client content through SEO, answer engine optimization, and content-led growth."
  },
  {
    year: "2024",
    event: "40+ Brands Scaled",
    desc: "From Mumbai startups to international brands — 40+ engagements with a 200%+ average ROI across the board."
  },
  {
    year: "2025",
    event: "5-Country Presence",
    desc: "Now running campaigns for clients in India, UAE, USA, UK, and Australia. The markets are different; the approach is the same."
  }
];
const storyParagraphs = [
  "Maverick Digitals was started by Muskan Rathod and Dhaval Shah in Mumbai — one with a background in brand strategy, the other in tech. The idea was simple: bring the two sides of modern marketing under one roof so brands don't have to choose between creative work and technical execution.",
  "We work with D2C brands, healthcare businesses, travel companies, coaches, B2B startups, and wedding planners. If you're a business that wants to actually build authority and grow — not just tick marketing boxes — we're probably a good fit.",
  "We started in 2021 with one commitment: no templates, no shortcuts. Just real strategy built around your business, your audience, and your goals. Five years in, that's still how we work.",
  "The numbers tell part of the story. 40+ brands scaled, 15M+ organic views, 200%+ average ROI, clients across India, UAE, USA, UK, and Australia. But what we're actually proud of is the brands that went from unknown to recognized — that's the work we show up for."
];
const stats = [
  { value: "40+", label: "Brands Scaled" },
  { value: "15M+", label: "Organic Views" },
  { value: "200%+", label: "Average ROI" },
  { value: "2X+", label: "Revenue Growth" },
  { value: "5", label: "Countries" }
];
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
      className: "flex flex-col items-center rounded-2xl border border-primary/15 bg-card/80 dark:bg-card/60 backdrop-blur-sm px-5 sm:px-8 py-6 sm:py-8 hover:border-primary/35 hover:shadow-[0_0_24px_oklch(var(--primary)/0.12)] transition-all duration-300 group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-3xl sm:text-4xl gradient-text-purple mb-1.5 group-hover:scale-105 transition-transform duration-300", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs sm:text-sm text-center font-medium uppercase tracking-wide", children: stat.label })
      ]
    }
  );
}
const values = [
  {
    title: "No templates",
    desc: "Every strategy is built from scratch for your business, your audience, and your goals — nothing copy-pasted."
  },
  {
    title: "Founder-direct",
    desc: "You work directly with Muskan and Dhaval, not handed off to a junior team after the first meeting."
  },
  {
    title: "Measurable always",
    desc: "Every campaign is tied to real business metrics. We don't run work that can't be attributed to growth."
  },
  {
    title: "Long-term thinking",
    desc: "Short wins matter, but we build for compounding. SEO, brand equity, content — assets that pay back over time."
  }
];
function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
              className: "relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.2, duration: 0.6 },
                    className: "flex justify-center mb-7",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag-label", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
                      "The Maverick Story"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    className: "text-h1 font-display font-extrabold text-foreground mb-7",
                    style: {
                      fontSize: "clamp(2.8rem, 6vw, 6rem)",
                      lineHeight: "var(--line-height-heading)",
                      letterSpacing: "var(--tracking-tight)"
                    },
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
                    className: "text-body-lg text-muted-foreground max-w-2xl mx-auto",
                    style: {
                      fontSize: "var(--font-size-body-lg)",
                      lineHeight: "var(--line-height-body)"
                    },
                    children: "A Mumbai-based digital marketing agency helping ambitious brands grow through strategy that connects, content that converts, and execution that actually delivers."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.95, duration: 0.6 },
                    className: "mt-10 mx-auto max-w-xl",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 py-5 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/8 backdrop-blur-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/50 text-4xl font-serif leading-none select-none", children: "“" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display font-semibold text-base sm:text-lg leading-snug text-center", children: "We don't just run campaigns. We build brands that people actually remember." })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: 1, scaleX: 1 },
                    transition: { delay: 1.1, duration: 0.8 },
                    className: "mt-10 w-16 h-px gradient-neon-purple mx-auto"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sr-only", children: "Maverick Digitals is a Mumbai-based digital marketing company founded in Mumbai, India. It is a full-stack agency specializing in SEO, AEO, GEO, performance marketing, personal branding, social media management, and website development. The agency has scaled 40+ brands across India, UAE, USA, UK, and Australia with 15M+ organic views and 200%+ ROI delivered." })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 section-gradient-border bg-card/30 dark:bg-card/20",
        "data-ocid": "about-stats",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatBadge, { stat, index: i }, stat.label)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-28 overflow-hidden",
        style: { minHeight: "800px" },
        "data-ocid": "about-founder",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: { zIndex: 0 },
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(GalaxyCanvas, { isDark })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: isDark ? "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(6,2,16,0.25) 100%)" : "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(200,210,240,0.10) 100%)",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative max-w-7xl mx-auto px-4 sm:px-6",
              style: { zIndex: 10 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 24 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.6 },
                    className: "text-center mb-16",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label", children: "The Visionaries" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h2",
                        {
                          className: "font-display font-extrabold text-foreground mb-5",
                          style: {
                            fontSize: "var(--font-size-h1)",
                            lineHeight: "var(--line-height-heading)",
                            letterSpacing: "var(--tracking-tight)"
                          },
                          children: [
                            "Meet the",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Minds Behind" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                            "the Maverick"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-muted-foreground max-w-lg mx-auto",
                          style: {
                            fontSize: "var(--font-size-body-lg)",
                            lineHeight: "var(--line-height-body)"
                          },
                          children: "Two people building one focused team — with a single goal of helping good brands grow in ways that last."
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-premium mb-16 mx-auto max-w-xs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-10 sm:gap-14 justify-center items-center md:items-start w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 50, scale: 0.96 },
                      whileInView: { opacity: 1, y: 0, scale: 1 },
                      viewport: { once: true },
                      transition: { delay: 0, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                      className: "flex flex-col items-center gap-6",
                      "data-ocid": "founder-card-mr",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ProfileCard,
                          {
                            name: "Muskan Rathod",
                            title: "Founder",
                            handle: "muskanrathod",
                            status: "Brand Strategist",
                            contactText: "Connect",
                            avatarUrl: "/assets/muskan-rathod.png",
                            showUserInfo: true,
                            enableTilt: true,
                            enableMobileTilt: false,
                            behindGlowColor: "rgba(139, 92, 246, 0.67)",
                            behindGlowEnabled: true,
                            innerGradient: "linear-gradient(145deg,#60496e8c 0%,#7c3aed44 100%)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-1", children: "Muskan Rathod" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs font-semibold uppercase tracking-widest mb-3", children: "Founder & Brand Strategist" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-muted-foreground leading-relaxed text-sm",
                              style: { lineHeight: "var(--line-height-body)" },
                              children: "Obsessed with storytelling that moves people and positioning that sticks. Muskan has built personal brands and growth strategies for founders and businesses across India and global markets."
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center mt-4", children: [
                            "Brand Strategy",
                            "Growth Marketing",
                            "Storytelling",
                            "Personal Branding"
                          ].map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300 font-medium",
                              children: skill
                            },
                            skill
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-3 mt-5", children: teamMembers[0].socials.map(
                            ({ icon: Icon, href, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "a",
                              {
                                href,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                "aria-label": label,
                                className: `w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground ${color} hover:scale-110 transition-all duration-200 bg-purple-500/8 border border-purple-500/20`,
                                "data-ocid": `mr-social-${label.toLowerCase()}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 })
                              },
                              label
                            )
                          ) })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 50, scale: 0.96 },
                      whileInView: { opacity: 1, y: 0, scale: 1 },
                      viewport: { once: true },
                      transition: {
                        delay: 0.18,
                        duration: 0.75,
                        ease: [0.16, 1, 0.3, 1]
                      },
                      className: "flex flex-col items-center gap-6",
                      "data-ocid": "founder-card-ds",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ProfileCard,
                          {
                            name: "Dhaval Shah",
                            title: "Co-Founder",
                            handle: "dhavalshah",
                            status: "Tech Innovator",
                            contactText: "Connect",
                            avatarUrl: "/assets/dhaval-shah.png",
                            showUserInfo: true,
                            enableTilt: true,
                            enableMobileTilt: false,
                            behindGlowColor: "rgba(34, 211, 238, 0.67)",
                            behindGlowEnabled: true,
                            innerGradient: "linear-gradient(145deg,#0e7490aa 0%,#22d3ee44 100%)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-1", children: "Dhaval Shah" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs font-semibold uppercase tracking-widest mb-3", children: "Co-Founder & Tech Lead" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-muted-foreground leading-relaxed text-sm",
                              style: { lineHeight: "var(--line-height-body)" },
                              children: "Builds the platforms that make everything else possible. 5+ years in the MERN stack, focused on sites and apps that are fast, clean, and built to convert."
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center mt-4", children: [
                            "Web Development",
                            "App Development",
                            "MERN Stack",
                            "Platform Optimization"
                          ].map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium",
                              children: skill
                            },
                            skill
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-3 mt-5", children: teamMembers[1].socials.map(
                            ({ icon: Icon, href, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "a",
                              {
                                href,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                "aria-label": label,
                                className: `w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground ${color} hover:scale-110 transition-all duration-200 bg-cyan-500/8 border border-cyan-500/20`,
                                "data-ocid": `ds-social-${label.toLowerCase()}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 })
                              },
                              label
                            )
                          ) })
                        ] })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 section-gradient-border bg-muted/20 dark:bg-card/10 overflow-hidden",
        "data-ocid": "about-values",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-10 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                className: "text-center mb-12",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label", children: "How We Work" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-display font-extrabold text-foreground mb-4",
                      style: {
                        fontSize: "var(--font-size-h2)",
                        lineHeight: "var(--line-height-heading)",
                        letterSpacing: "var(--tracking-tight)"
                      },
                      children: "Four rules we never break"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-muted-foreground max-w-lg mx-auto",
                      style: { lineHeight: "var(--line-height-body)" },
                      children: "These aren't company values from a deck — they're just how we actually show up to work."
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.1, duration: 0.55 },
                className: "glass-card p-6 group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl gradient-neon-purple flex items-center justify-center mb-4 text-white font-display font-black text-sm group-hover:scale-110 transition-transform duration-300", children: String(i + 1).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-foreground text-base mb-2", children: v.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: v.desc })
                ]
              },
              v.title
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-24 overflow-hidden",
        "data-ocid": "about-story",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-20 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.7 },
                className: "text-center mb-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label", children: "The Journey" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h2",
                    {
                      className: "font-display font-extrabold text-foreground",
                      style: {
                        fontSize: "var(--font-size-h2)",
                        lineHeight: "var(--line-height-heading)",
                        letterSpacing: "var(--tracking-tight)"
                      },
                      children: [
                        "How a rebel marketer",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan", children: "changed the game" })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-6 text-muted-foreground",
                style: {
                  fontSize: "var(--font-size-body-lg)",
                  lineHeight: "var(--line-height-body)"
                },
                children: storyParagraphs.map((para, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { delay: i * 0.12, duration: 0.6 },
                    children: para
                  },
                  para.slice(0, 20)
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-28 section-gradient-border overflow-hidden bg-card/20 dark:bg-card/10",
        "data-ocid": "about-mission",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-primary/4 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: missionRef,
              style: missionStyle,
              className: "max-w-5xl mx-auto px-4 sm:px-6 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label", children: "Our Mission" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "blockquote",
                  {
                    className: "font-display font-extrabold leading-tight mb-8",
                    style: {
                      fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                      lineHeight: "var(--line-height-heading)",
                      letterSpacing: "var(--tracking-tight)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "We don't just run campaigns." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "We build real brands." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-muted-foreground max-w-2xl mx-auto",
                    style: {
                      fontSize: "var(--font-size-body-lg)",
                      lineHeight: "var(--line-height-body)"
                    },
                    children: "Creativity, strategy, and technical execution — brought together for brands that want to grow properly. We're active across India, UAE, USA, UK, and Australia."
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
        "data-ocid": "about-timeline",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -30 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.7 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label", children: "Our History" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h2",
                    {
                      className: "font-display font-extrabold text-foreground mb-6",
                      style: {
                        fontSize: "var(--font-size-h1)",
                        lineHeight: "var(--line-height-heading)",
                        letterSpacing: "var(--tracking-tight)"
                      },
                      children: [
                        "Five years of",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan", children: "bold moves" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-muted-foreground max-w-sm",
                      style: { lineHeight: "var(--line-height-body)" },
                      children: "Every milestone happened because the team kept showing up and doing the work — no shortcuts, no overpromising, just consistent effort and honest results."
                    }
                  )
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
          className: "relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label", children: "Ready to Start?" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h2",
              {
                className: "font-display font-extrabold text-foreground mb-6",
                style: {
                  fontSize: "var(--font-size-h1)",
                  lineHeight: "var(--line-height-heading)",
                  letterSpacing: "var(--tracking-tight)"
                },
                children: [
                  "Let's Build Something",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Together" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-muted-foreground mb-10 max-w-xl mx-auto",
                style: {
                  fontSize: "var(--font-size-body-lg)",
                  lineHeight: "var(--line-height-body)"
                },
                children: "Your brand has a story worth telling. Let's make sure the right people actually hear it."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "gradient-neon-purple text-white font-semibold glow-neon hover:scale-105 transition-smooth border-0 px-10 h-12",
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
