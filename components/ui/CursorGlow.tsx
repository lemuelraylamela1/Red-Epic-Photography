"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const isCoarse = useMediaQuery("(pointer: coarse)");
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 24 });
  const springY = useSpring(y, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (reduceMotion || isCoarse) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 140);
      y.set(event.clientY - 140);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isCoarse, reduceMotion, x, y]);

  if (reduceMotion || isCoarse) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(179,0,27,0.16),transparent_68%)] mix-blend-multiply lg:block"
      style={{ x: springX, y: springY }}
    />
  );
}
