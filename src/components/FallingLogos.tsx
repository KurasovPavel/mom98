import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

const FALL_COUNT = 22;

export const FallingLogos = () => {
  const prefersReducedMotion = useReducedMotion();
  const flakes = useMemo(
    () =>
      Array.from({ length: FALL_COUNT }).map((_, index) => ({
        id: index,
        size: 18 + Math.random() * 22,
        left: Math.random() * 100,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * -20,
        rotation: Math.random() * 360,
        opacity: 0.15 + Math.random() * 0.2,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute top-[-10%]"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: prefersReducedMotion
              ? "none"
              : `falling ${flake.duration}s linear ${flake.delay}s infinite`,
            ["--rotation" as string]: `${flake.rotation}deg`,
          }}
        >
          <img src="/monad-flake.png" alt="" className="h-full w-full object-contain" />
        </span>
      ))}
    </div>
  );
};
