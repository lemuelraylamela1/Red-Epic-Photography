"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { portfolioCategories, portfolioItems } from "@/data/site";
import type { PortfolioCategory } from "@/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const heightMap = {
  short: "h-56 sm:h-64",
  medium: "h-72 sm:h-80",
  tall: "h-[22rem] sm:h-[28rem]",
};

export function Portfolio() {
  const [category, setCategory] = useState<PortfolioCategory>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === category),
    [category],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % filtered.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + filtered.length) % filtered.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, filtered.length]);

  return (
    <section id="portfolio" className="section-padding bg-off-white">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title="The centerpiece of our craft."
            description="A curated selection of cinematic frames across weddings, portraits, families, and brands."
            align="center"
            className="mb-10"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mb-10 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Portfolio categories"
          >
            {portfolioCategories.map((item) => {
              const selected = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs tracking-[0.16em] uppercase transition",
                    selected
                      ? "bg-primary text-white"
                      : "bg-white text-muted hover:text-primary",
                  )}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                layout
                key={item.id}
                type="button"
                className={cn("masonry-item group relative w-full overflow-hidden text-left", heightMap[item.height])}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActiveIndex(index)}
                aria-label={`Open ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] tracking-[0.24em] text-white/70 uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && filtered[activeIndex] ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio lightbox"
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              className="absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Close lightbox"
              onClick={() => setActiveIndex(null)}
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="absolute left-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white md:left-8"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex(
                  (activeIndex - 1 + filtered.length) % filtered.length,
                );
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={filtered[activeIndex].id}
              className="relative h-[70vh] w-full max-w-5xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={filtered[activeIndex].src}
                alt={filtered[activeIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 to-transparent p-6 text-white">
                <p className="text-xs tracking-[0.22em] uppercase opacity-70">
                  {filtered[activeIndex].category}
                </p>
                <h3 className="mt-1 text-2xl font-semibold">
                  {filtered[activeIndex].title}
                </h3>
              </div>
            </motion.div>

            <button
              type="button"
              className="absolute right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white md:right-8"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((activeIndex + 1) % filtered.length);
              }}
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
