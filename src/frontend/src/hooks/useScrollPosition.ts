import { useEffect, useState } from "react";

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  scrollDirection: "up" | "down" | null;
  isScrolled: boolean;
  scrollPercent: number;
}

export function useScrollPosition(threshold = 50): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
    isScrolled: false,
    scrollPercent: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      const scrollDirection = scrollY > lastScrollY ? "down" : "up";

      setScrollPosition({
        scrollY,
        scrollX,
        scrollDirection,
        isScrolled: scrollY > threshold,
        scrollPercent,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollPosition();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrollPosition;
}
