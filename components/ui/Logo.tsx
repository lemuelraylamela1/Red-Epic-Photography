"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

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
  const pathname = usePathname();
  const color =
    variant === "light"
      ? "text-white"
      : variant === "brand"
        ? "text-primary"
        : "text-body";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  };

  // Official mark is white on transparent; tint for light surfaces.
  const imageFilter =
    variant === "light"
      ? undefined
      : variant === "brand"
        ? "brightness(0) saturate(100%) invert(10%) sepia(96%) saturate(5000%) hue-rotate(340deg) brightness(0.85)"
        : "brightness(0)";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3",
        color,
        className,
      )}
      aria-label={`${siteConfig.name} home`}
      onClick={handleClick}
    >
      <span
        className={cn(
          "relative inline-flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12",
          markClassName,
        )}
      >
        <Image
          src={siteConfig.mark}
          alt=""
          fill
          sizes="48px"
          priority
          className="object-contain"
          style={imageFilter ? { filter: imageFilter } : undefined}
        />
      </span>
      {showWordmark ? (
        <span className="wordmark truncate text-[10px] tracking-[0.22em] sm:text-xs sm:tracking-[0.28em]">
          {siteConfig.wordmark}
        </span>
      ) : null}
    </Link>
  );
}
