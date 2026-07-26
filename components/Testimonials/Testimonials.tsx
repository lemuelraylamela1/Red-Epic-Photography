"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const active = testimonials[index];

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  const go = (direction: -1 | 1) => {
    setIndex((current) =>
      (current + direction + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="section-padding brand-gradient text-white">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Stories from the people we photograph."
            description="Quiet confidence, trusted craft, and images that feel like home."
            align="center"
            light
            className="mb-14"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
              setPaused(true);
            }}
            onTouchEnd={(event) => {
              const start = touchStartX.current;
              const end = event.changedTouches[0]?.clientX;
              if (start != null && end != null) {
                const delta = end - start;
                if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
              }
              touchStartX.current = null;
              setPaused(false);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                className="glass-panel rounded-3xl p-8 text-body sm:p-12"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45 }}
              >
                <div className="mb-6 flex items-center gap-1 text-accent">
                  {Array.from({ length: active.rating }).map((_, star) => (
                    <Star key={star} size={16} fill="currentColor" aria-hidden />
                  ))}
                  <span className="sr-only">{active.rating} out of 5 stars</span>
                </div>

                <blockquote className="text-xl leading-relaxed text-body/90 sm:text-2xl">
                  “{active.quote}”
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <Image
                    src={active.image}
                    alt={active.alt}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-body">{active.name}</p>
                    <p className="text-sm text-muted">{active.role}</p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-dark"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2" aria-hidden>
                {testimonials.map((item, dot) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`h-2 w-2 rounded-full transition ${
                      dot === index ? "bg-white" : "bg-white/35"
                    }`}
                    aria-label={`Go to testimonial ${dot + 1}`}
                    onClick={() => setIndex(dot)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-dark"
                aria-label="Next testimonial"
                onClick={() => go(1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
