import { useEffect, useRef } from "react";

/** A bounded gooey trail: no full-screen filter or React updates per frame. */
export function LiquidCursor() {
  const surface = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = surface.current;
    if (!svg) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const circles = Array.from(svg.querySelectorAll("circle"));
    const points = circles.map(() => ({ x: 0, y: 0 }));
    let target = { x: 0, y: 0 };
    let frame = 0;
    let lastTime = 0;
    let lastMove = 0;
    let initialized = false;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      initialized = false;
      svg.style.opacity = "0";
    };

    const draw = (time: number) => {
      if (!pointer.matches || reduced.matches || document.hidden) {
        stop();
        return;
      }
      const dt = Math.min((time - lastTime) / 16.67, 2);
      lastTime = time;
      const age = time - lastMove;
      const opacity = Math.max(0, Math.min(1, (1000 - age) / 450));
      svg.style.opacity = String(opacity * 0.65);
      const head = points[0];
      if (!head) return;
      head.x += (target.x - head.x) * (1 - Math.pow(0.5, dt));
      head.y += (target.y - head.y) * (1 - Math.pow(0.5, dt));
      svg.style.transform = `translate3d(${head.x - 110}px, ${head.y - 110}px, 0)`;
      points.forEach((point, index) => {
        const previous = points[index - 1];
        if (previous) {
          const follow = 1 - Math.pow(0.72, dt);
          point.x += (previous.x - point.x) * follow;
          point.y += (previous.y - point.y) * follow;
          // Keep all drawing inside the small filter surface even on fast moves.
          const distance = Math.hypot(point.x - head.x, point.y - head.y);
          if (distance > 75) {
            point.x = head.x + ((point.x - head.x) / distance) * 75;
            point.y = head.y + ((point.y - head.y) / distance) * 75;
          }
        }
        circles[index]?.setAttribute("cx", String(110 + point.x - head.x));
        circles[index]?.setAttribute("cy", String(110 + point.y - head.y));
      });
      if (opacity === 0) {
        stop();
        return;
      }
      frame = requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !pointer.matches || reduced.matches) return;
      target = { x: event.clientX, y: event.clientY };
      lastMove = performance.now();
      if (!initialized) {
        points.forEach((point) => Object.assign(point, target));
        initialized = true;
      }
      if (!frame) {
        lastTime = lastMove;
        frame = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", stop);
    window.addEventListener("blur", stop);
    document.addEventListener("visibilitychange", stop);
    pointer.addEventListener("change", stop);
    reduced.addEventListener("change", stop);
    return () => {
      stop();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", stop);
      window.removeEventListener("blur", stop);
      document.removeEventListener("visibilitychange", stop);
      pointer.removeEventListener("change", stop);
      reduced.removeEventListener("change", stop);
    };
  }, []);

  return (
    <svg ref={surface} className="liquid-cursor" width="220" height="220" viewBox="0 0 220 220" aria-hidden="true" focusable="false">
      <defs>
        <filter id="cursor-liquid-merge" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="soft" />
          <feColorMatrix in="soft" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
        </filter>
      </defs>
      <g filter="url(#cursor-liquid-merge)">
        {[14, 13, 12, 11, 10, 9, 8, 7, 6].map((radius, index) => (
          <circle key={index} cx="110" cy="110" r={radius} />
        ))}
      </g>
    </svg>
  );
}