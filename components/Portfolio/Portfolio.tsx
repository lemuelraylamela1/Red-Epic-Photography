"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { portfolioAlbums, portfolioCategories } from "@/data/site";
import type { PortfolioAlbum, PortfolioCategory } from "@/types";
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
  const [activeAlbum, setActiveAlbum] = useState<PortfolioAlbum | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? portfolioAlbums
        : portfolioAlbums.filter((album) => album.category === category),
    [category],
  );

  useEffect(() => {
    const open = Boolean(activeAlbum) || lightboxIndex !== null;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeAlbum, lightboxIndex]);

  useEffect(() => {
    if (!activeAlbum && lightboxIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
          return;
        }
        setActiveAlbum(null);
      }

      if (lightboxIndex === null || !activeAlbum) return;

      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? 0 : (current + 1) % activeAlbum.photos.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null
            ? 0
            : (current - 1 + activeAlbum.photos.length) %
              activeAlbum.photos.length,
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeAlbum, lightboxIndex]);

  const openAlbum = (album: PortfolioAlbum) => {
    if (album.photos.length <= 1) {
      setActiveAlbum(album);
      setLightboxIndex(0);
      return;
    }
    setActiveAlbum(album);
    setLightboxIndex(null);
  };

  const closeAlbum = () => {
    setActiveAlbum(null);
    setLightboxIndex(null);
  };

  return (
    <section id="portfolio" className="section-padding bg-off-white">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title="The centerpiece of our craft."
            description="Browse wedding albums and curated sessions—open a cover to explore the full gallery."
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
            {filtered.map((album) => (
              <motion.button
                layout
                key={album.id}
                type="button"
                className={cn(
                  "masonry-item group relative w-full overflow-hidden text-left",
                  heightMap[album.height],
                )}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => openAlbum(album)}
                aria-label={`Open album ${album.title}`}
              >
                <Image
                  src={album.cover}
                  alt={album.coverAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[10px] tracking-[0.24em] text-white/70 uppercase">
                    {album.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold sm:text-xl">
                    {album.title}
                  </h3>
                  {album.photos.length > 1 ? (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/75">
                      <Images size={14} aria-hidden />
                      {album.photos.length} photos — view album
                    </p>
                  ) : null}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeAlbum && lightboxIndex === null ? (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeAlbum.title} album`}
          >
            <div className="border-b border-dark/5 bg-white/95 backdrop-blur-xl">
              <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-primary"
                  onClick={closeAlbum}
                >
                  <ArrowLeft size={18} aria-hidden />
                  Back to portfolio
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-dark/10"
                  aria-label="Close album"
                  onClick={closeAlbum}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-80">
                <Image
                  src={activeAlbum.cover}
                  alt={activeAlbum.coverAlt}
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 container-page pb-8 text-white">
                  <p className="text-[10px] tracking-[0.24em] text-white/70 uppercase">
                    {activeAlbum.category} Album
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold sm:text-4xl">
                    {activeAlbum.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/75">
                    {activeAlbum.photos.length} photographs
                  </p>
                </div>
              </div>

              <div className="container-page py-8 sm:py-10">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {activeAlbum.photos.map((photo, index) => (
                    <button
                      key={`${photo.src}-${index}`}
                      type="button"
                      className="group relative aspect-[3/4] overflow-hidden bg-light-gray"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Open photo ${index + 1}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeAlbum &&
        lightboxIndex !== null &&
        activeAlbum.photos[lightboxIndex] ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-dark/92 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            onClick={() =>
              activeAlbum.photos.length <= 1
                ? closeAlbum()
                : setLightboxIndex(null)
            }
          >
            <button
              type="button"
              className="absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Close lightbox"
              onClick={() =>
                activeAlbum.photos.length <= 1
                  ? closeAlbum()
                  : setLightboxIndex(null)
              }
            >
              <X size={20} />
            </button>

            {activeAlbum.photos.length > 1 ? (
              <button
                type="button"
                className="absolute left-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white md:left-8"
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + activeAlbum.photos.length) %
                      activeAlbum.photos.length,
                  );
                }}
              >
                <ChevronLeft size={22} />
              </button>
            ) : null}

            <motion.div
              key={activeAlbum.photos[lightboxIndex].src}
              className="relative h-[70vh] w-full max-w-5xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={activeAlbum.photos[lightboxIndex].src}
                alt={activeAlbum.photos[lightboxIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-dark/80 to-transparent p-6 text-white">
                <p className="text-xs tracking-[0.22em] uppercase opacity-70">
                  {activeAlbum.title}
                </p>
                <h3 className="mt-1 text-lg font-semibold sm:text-xl">
                  Photo {lightboxIndex + 1} of {activeAlbum.photos.length}
                </h3>
              </div>
            </motion.div>

            {activeAlbum.photos.length > 1 ? (
              <button
                type="button"
                className="absolute right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white md:right-8"
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex + 1) % activeAlbum.photos.length,
                  );
                }}
              >
                <ChevronRight size={22} />
              </button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
