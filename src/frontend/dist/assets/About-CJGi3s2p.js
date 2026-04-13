import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Linkedin, T as Twitter, I as Instagram, L as Link, B as Button } from "./index-CkDoOixv.js";
import { u as useRevealOnScroll } from "./useIntersectionObserver-0NrDPXfO.js";
import { f as frame, d as cancelFrame, e as interpolate, g as supportsViewTimeline, h as supportsScrollTimeline, p as progress, v as velocityPerSecond, i as isHTMLElement, j as defaultOffset$1, k as clamp, n as noop, l as resize, o as frameData, u as useConstant, b as useIsomorphicLayoutEffect, q as invariant, t as motionValue, M as MotionConfigContext, w as collectMotionValues, m as motion } from "./proxy-D-kw7GND.js";
import { A as ArrowRight } from "./arrow-right-DoFOMOxd.js";
import { T as TrendingUp } from "./trending-up-BiPoeDkC.js";
import { B as BookOpen } from "./book-open-DyFNksev.js";
import { S as Star } from "./star-DVdW_tuB.js";
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
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
const skills = [
  { label: "Brand Strategy", level: 95, icon: Sparkles, color: "primary" },
  {
    label: "Growth Marketing",
    level: 92,
    icon: TrendingUp,
    color: "secondary"
  },
  { label: "Storytelling", level: 98, icon: BookOpen, color: "accent" },
  { label: "Personal Branding", level: 90, icon: Star, color: "primary" }
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
const socials = [
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
];
const ORBIT_RADIUS_OUTER = 130;
const ORBIT_RADIUS_INNER = 72;
function OrbitRing({
  radius,
  duration,
  children,
  reverse = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "absolute inset-0 pointer-events-none",
      style: { margin: "auto", top: 0, left: 0, right: 0, bottom: 0 },
      animate: { rotate: reverse ? -360 : 360 },
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration,
        ease: "linear"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-full border border-primary/10",
            style: {
              width: radius * 2,
              height: radius * 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }
          }
        ),
        children
      ]
    }
  );
}
function OrbitPill({
  skill,
  angle,
  radius,
  reverse = false
}) {
  const Icon = skill.icon;
  const rad = angle * Math.PI / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute pointer-events-auto",
      style: {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)"
      },
      animate: { rotate: reverse ? 360 : -360 },
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 18,
        ease: "linear"
      },
      whileHover: { scale: 1.15 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glassmorphic border-primary/30 px-3 py-1.5 flex items-center gap-1.5 shadow-lg hover:border-primary/60 transition-smooth cursor-default whitespace-nowrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: skill.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary ml-1", children: [
          skill.level,
          "%"
        ] })
      ] })
    }
  );
}
function OrbitShowcase() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-[340px] h-[340px] flex items-center justify-center mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-36 h-36 glassmorphic border-primary/40 flex flex-col items-center justify-center glow-neon rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-neon-purple w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-background font-display font-bold text-lg", children: "MR" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-display font-semibold text-sm", children: "Muskan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-medium", children: "Founder" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitRing, { radius: ORBIT_RADIUS_OUTER, duration: 20, children: skills.map((skill, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitPill,
      {
        skill,
        angle: i * 90,
        radius: ORBIT_RADIUS_OUTER
      },
      skill.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute rounded-full border border-accent/8 pointer-events-none",
        style: {
          width: ORBIT_RADIUS_INNER * 2,
          height: ORBIT_RADIUS_INNER * 2
        },
        animate: { rotate: -360 },
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 14,
          ease: "linear"
        },
        children: [0, 120, 240].map((angle) => {
          const rad = angle * Math.PI / 180;
          const x = Math.cos(rad) * ORBIT_RADIUS_INNER;
          const y = Math.sin(rad) * ORBIT_RADIUS_INNER;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_6px_2px_oklch(var(--accent)/0.5)]",
              style: {
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)"
              },
              animate: { rotate: 360 },
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 14,
                ease: "linear"
              }
            },
            angle
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none" })
  ] });
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
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
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
        "data-ocid": "about-founder",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: titleRef,
                style: titleStyle,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative glassmorphic border-primary/20 p-8 overflow-hidden hover:border-primary/40 transition-smooth group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/20 transition-smooth pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-primary/70 to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-primary/70 to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-24 h-px bg-gradient-to-l from-accent/70 to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-px h-24 bg-gradient-to-t from-accent/70 to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 mb-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full rounded-2xl gradient-neon-purple flex items-center justify-center glow-neon text-background font-display font-bold text-3xl shadow-elevated", children: "MR" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 blur-sm -z-10" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-background",
                          animate: { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] },
                          transition: {
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-1", children: "Muskan Rathod" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold text-sm uppercase tracking-wider mb-5", children: "Founder & Brand Strategist" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4 text-[15px]", children: "A brand strategist and growth marketer with a relentless drive to build brands that matter. Muskan founded Maverick Digitals after witnessing too many great businesses fade into obscurity — not from lack of quality, but from lack of story." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-[15px]", children: "With a background across 50+ brands and multiple industries, she brings a rare fusion of creative vision and analytical rigor — turning brand narratives into market-moving results." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-6 pt-6 border-t border-border/50", children: [
                      socials.map(({ icon: Icon, href, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": label,
                          className: `w-9 h-9 glassmorphic border-white/10 flex items-center justify-center text-muted-foreground ${color} hover:border-primary/40 hover:scale-110 transition-smooth`,
                          "data-ocid": `social-${label.toLowerCase()}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15 })
                        },
                        label
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm ml-2", children: "Follow the journey" })
                    ] })
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-2", children: "Core Expertise" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-2xl text-foreground", children: "Skills in Orbit" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitShowcase, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: "Each discipline in constant motion — always circling the core mission of building brands that dominate." })
            ] })
          ] }) })
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
