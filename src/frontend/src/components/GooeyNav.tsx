import { useCallback, useEffect, useRef, useState } from "react";

export interface GooeyNavItem {
  label: string;
  href: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  onItemClick?: (item: GooeyNavItem, index: number) => void;
}

const GOOEY_NAV_STYLES = `
  .gooey-nav-container {
    position: relative;
  }

  .gooey-nav-container nav {
    display: flex;
    position: relative;
    transform: translate3d(0, 0, 0.01px);
  }

  .gooey-nav-container nav ul {
    display: flex;
    gap: 2em;
    list-style: none;
    padding: 0 1em;
    margin: 0;
    position: relative;
    z-index: 3;
    color: white;
    text-shadow: 0 1px 1px hsl(205deg 30% 10% / 0.2);
  }

  .gooey-nav-container nav ul li {
    border-radius: 100vw;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 0.5px 1.5px transparent;
    color: white;
  }

  .gooey-nav-container nav ul li a {
    display: inline-block;
    padding: 0.6em 1em;
  }

  .gooey-nav-container nav ul li:focus-within:has(:focus-visible) {
    box-shadow: 0 0 0.5px 1.5px white;
  }

  .gooey-nav-container nav ul li::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: white;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
    z-index: -1;
  }

  .gooey-nav-container nav ul li.active {
    color: black;
    text-shadow: none;
  }

  .gooey-nav-container nav ul li.active::after {
    opacity: 1;
    transform: scale(1);
  }

  .gooey-nav-container .effect {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    opacity: 1;
    pointer-events: none;
    display: grid;
    place-items: center;
    z-index: 1;
  }

  .gooey-nav-container .effect.text {
    color: white;
    transition: color 0.3s ease;
  }

  .gooey-nav-container .effect.text.active {
    color: black;
  }

  .gooey-nav-container .effect.filter {
    filter: blur(7px) contrast(100) blur(0);
    mix-blend-mode: lighten;
  }

  .gooey-nav-container .effect.filter::before {
    content: "";
    position: absolute;
    inset: -75px;
    z-index: -2;
    background: black;
  }

  .gooey-nav-container .effect.filter::after {
    content: "";
    position: absolute;
    inset: 0;
    background: white;
    transform: scale(0);
    opacity: 0;
    z-index: -1;
    border-radius: 100vw;
  }

  .gooey-nav-container .effect.active::after {
    animation: gooey-pill 0.3s ease both;
  }

  @keyframes gooey-pill {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .gooey-particle,
  .gooey-point {
    display: block;
    opacity: 0;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    transform-origin: center;
  }

  .gooey-particle {
    --time: 5s;
    position: absolute;
    top: calc(50% - 8px);
    left: calc(50% - 8px);
    animation: gooey-particle-anim calc(var(--time)) ease 1 -350ms;
  }

  .gooey-point {
    background: var(--color);
    opacity: 1;
    animation: gooey-point-anim calc(var(--time)) ease 1 -350ms;
  }

  @keyframes gooey-particle-anim {
    0% {
      transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
      opacity: 1;
      animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
    }
    70% {
      transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
      opacity: 1;
      animation-timing-function: ease;
    }
    85% {
      transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
      opacity: 1;
    }
    100% {
      transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
      opacity: 1;
    }
  }

  @keyframes gooey-point-anim {
    0% {
      transform: scale(0);
      opacity: 0;
      animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
    }
    25% {
      transform: scale(calc(var(--scale) * 0.25));
    }
    38% {
      opacity: 1;
    }
    65% {
      transform: scale(var(--scale));
      opacity: 1;
      animation-timing-function: ease;
    }
    85% {
      transform: scale(var(--scale));
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
`;

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  onItemClick,
}: GooeyNavProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  // Inject styles once into the document head
  useEffect(() => {
    const styleId = "gooey-nav-styles";
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = GOOEY_NAV_STYLES;
      document.head.appendChild(styleEl);
    }
    return () => {
      // Only remove if no other GooeyNav instances exist
      const containers = document.querySelectorAll(".gooey-nav-container");
      if (containers.length <= 1) {
        document.getElementById(styleId)?.remove();
      }
    };
  }, []);

  // Sync external activeIndex changes (e.g. route changes)
  useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number,
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number,
  ) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("gooey-particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        const colorMap: Record<number, string> = {
          1: "oklch(0.68 0.24 308)",
          2: "oklch(0.72 0.19 200)",
          3: "oklch(0.75 0.18 240)",
          4: "oklch(0.8 0.15 180)",
        };
        particle.style.setProperty("--color", colorMap[p.color] ?? "white");
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("gooey-point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // particle already removed
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    const liEl = e.currentTarget;

    if (activeIndex !== index) {
      setActiveIndex(index);
      updateEffectPosition(liEl);

      if (filterRef.current) {
        const particles = filterRef.current.querySelectorAll(".gooey-particle");
        for (const p of particles) {
          filterRef.current.removeChild(p);
        }
      }

      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
      }

      if (filterRef.current) {
        makeParticles(filterRef.current);
      }
    }

    onItemClick?.(items[index], index);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement as HTMLLIElement | null;
      if (liEl) {
        handleClick(
          {
            currentTarget: liEl,
            preventDefault: () => {},
          } as React.MouseEvent<HTMLLIElement>,
          index,
        );
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;

    const activeLi = navRef.current.querySelectorAll("li")[activeIndex] as
      | HTMLElement
      | undefined;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[
        activeIndex
      ] as HTMLElement | undefined;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [activeIndex, updateEffectPosition]);

  return (
    <>
      {/* Hidden SVG gooey filter — must be in DOM for filter: url('#gooey-nav-filter') to work */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="gooey-nav-container" ref={containerRef}>
        <nav aria-label="Main navigation">
          <ul ref={navRef}>
            {items.map((item, index) => (
              <li
                key={item.href}
                className={activeIndex === index ? "active" : ""}
                onClick={(e) => handleClick(e, index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const syntheticClick = {
                      currentTarget: e.currentTarget as HTMLLIElement,
                      preventDefault: () => {},
                    } as React.MouseEvent<HTMLLIElement>;
                    handleClick(syntheticClick, index);
                  }
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => e.preventDefault()}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  data-ocid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;
