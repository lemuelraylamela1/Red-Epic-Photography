"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { heroSlides, siteConfig } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BrandMark } from "@/components/ui/BrandMark";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const parallaxY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 24;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-28 text-white sm:items-center sm:pb-0"
    >
      <div className="absolute inset-0 brand-gradient" aria-hidden />

      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={heroSlides[index].src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-[-4%]"
              style={
                reduceMotion
                  ? undefined
                  : { x: parallaxX, y: parallaxY, scale: 1.05 }
              }
            >
              <Image
                src={heroSlides[index].src}
                alt={heroSlides[index].alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover opacity-45 mix-blend-luminosity"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 brand-vignette" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark/70" aria-hidden />
      </div>

      {!reduceMotion ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-[18%] right-[12%] h-40 w-40 rounded-full bg-white/10 blur-3xl"
            animate={{ y: [0, -18, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-[22%] left-[8%] h-28 w-28 rounded-full bg-accent/30 blur-2xl"
            animate={{ y: [0, 16, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}

      <div className="container-page relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="inline-flex h-12 w-12 text-white sm:h-14 sm:w-14">
              <BrandMark />
            </span>
            <p className="wordmark text-[11px] text-white/90 sm:text-xs">
              {siteConfig.wordmark}
            </p>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-7xl"
          >
            Capturing Moments.
            <br />
            Creating Timeless Memories.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton href="/#contact" variant="light">
              Book a Session
            </MagneticButton>
            <MagneticButton href="/#portfolio" variant="secondary">
              View Portfolio
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <Link
        href="/#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition hover:text-white"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </Link>
    </section>
  );
}
