import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
};

export function BrandMark({ className }: MarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <g transform="translate(64 64) rotate(45)">
        <rect
          x="-36"
          y="-36"
          width="72"
          height="72"
          rx="16"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
        />
      </g>
      <path
        fill="currentColor"
        d="M46 40h18c8.8 0 14 4.8 14 12.2 0 5.2-2.8 9.2-7.4 10.8 5.8 1.4 9.4 6 9.4 12.4 0 8.2-6 13.6-16.2 13.6H46V40zm12.2 17.4h5c3.4 0 5.4-1.8 5.4-4.6s-2-4.4-5.4-4.4h-5v9zm0 24.2h6.4c4 0 6.4-2.2 6.4-5.4 0-3.2-2.4-5.2-6.4-5.2h-6.4v10.6z"
      />
    </svg>
  );
}
