import { r as reactExports } from "./index-C-4YwrUA.js";
function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    once = true
  } = options;
  const ref = reactExports.useRef(null);
  const [state, setState] = reactExports.useState({
    isIntersecting: false,
    hasIntersected: false,
    entry: null
  });
  reactExports.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState((prev) => ({
          isIntersecting: entry.isIntersecting,
          hasIntersected: prev.hasIntersected || entry.isIntersecting,
          entry
        }));
        if (once && entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);
  return [ref, state];
}
function useRevealOnScroll(delay = 0) {
  const [ref, { hasIntersected }] = useIntersectionObserver({
    threshold: 0.1,
    once: true
  });
  const style = {
    opacity: hasIntersected ? 1 : 0,
    transform: hasIntersected ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`
  };
  return { ref, style, isVisible: hasIntersected };
}
export {
  useRevealOnScroll as u
};
