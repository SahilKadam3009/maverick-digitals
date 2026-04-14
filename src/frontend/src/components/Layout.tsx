import { type ReactNode, useEffect, useRef } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import SplashCursor from "./SplashCursor";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = cursorGlowRef.current;
    if (!glow) return;

    let raf: number;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const onMouseMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      cx = lerp(cx, tx, 0.08);
      cy = lerp(cy, ty, 0.08);
      glow.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fluid splash cursor effect - canvas overlay */}
      <SplashCursor />

      {/* Global cursor glow effect */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.24 308 / 0.04) 0%, transparent 70%)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10">{children}</main>

      <Footer />
    </div>
  );
}
