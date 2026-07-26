import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type MarkProps = {
  className?: string;
  variant?: "light" | "brand" | "dark";
};

export function BrandMark({ className, variant = "light" }: MarkProps) {
  const imageFilter =
    variant === "light"
      ? undefined
      : variant === "brand"
        ? "brightness(0) saturate(100%) invert(10%) sepia(96%) saturate(5000%) hue-rotate(340deg) brightness(0.85)"
        : "brightness(0)";

  return (
    <span className={cn("relative inline-block h-full w-full", className)}>
      <Image
        src={siteConfig.mark}
        alt=""
        fill
        sizes="64px"
        className="object-contain"
        style={imageFilter ? { filter: imageFilter } : undefined}
      />
    </span>
  );
}
