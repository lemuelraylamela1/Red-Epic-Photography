"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-primary shadow-[0_14px_40px_rgba(148,0,18,0.35)]",
  secondary:
    "bg-transparent text-white border border-white/70 hover:bg-white hover:text-dark",
  ghost:
    "bg-transparent text-body border border-body/15 hover:border-accent hover:text-accent",
  light:
    "bg-white text-dark hover:bg-off-white shadow-[0_14px_40px_rgba(52,0,6,0.18)]",
};

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  type = "button",
  ariaLabel,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.18);
    y.set(offsetY * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
    variants[variant],
    className,
  );

  const content = (
    <motion.span style={{ x: springX, y: springY }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
