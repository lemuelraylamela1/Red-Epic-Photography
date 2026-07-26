"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
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

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex min-w-0 max-w-full items-center gap-2 sm:gap-3",
        color,
        className,
      )}
      aria-label={`${siteConfig.name} home`}
      onClick={handleClick}
    >
      <span
        className={cn(
          "relative inline-flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10",
          markClassName,
        )}
      >
        <BrandMark />
      </span>
      {showWordmark ? (
        <span className="wordmark truncate text-[10px] sm:text-xs">
          {siteConfig.wordmark}
        </span>
      ) : null}
    </Link>
  );
}
