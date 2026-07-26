"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { BrandMark } from "@/components/ui/BrandMark";

type LogoProps = {
  variant?: "light" | "dark" | "brand";
  showWordmark?: boolean;
  className?: string;
  markClassName?: string;
};

export function Logo({
  variant = "dark",
  showWordmark = true,
  className,
  markClassName,
}: LogoProps) {
  const color =
    variant === "light"
      ? "text-white"
      : variant === "brand"
        ? "text-primary"
        : "text-body";

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", color, className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span
        className={cn(
          "relative inline-flex h-10 w-10 items-center justify-center",
          markClassName,
        )}
      >
        <BrandMark />
      </span>
      {showWordmark ? (
        <span className="wordmark text-[11px] sm:text-xs">{siteConfig.wordmark}</span>
      ) : null}
    </Link>
  );
}
