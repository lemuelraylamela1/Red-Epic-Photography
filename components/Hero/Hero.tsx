"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { heroSlides, siteConfig } from "@/data/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const isCoarse = useMediaQuery("(pointer: coarse)");
  const isShort = useMediaQuery("(max-height: 700px)");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const parallaxY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const enableParallax = !reduceMotion && !isCoarse;

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enableParallax) return;
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 24;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enableParallax, mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative flex min-h-svh w-full items-center overflow-x-clip overflow-y-hidden pb-24 pt-24 text-white sm:pb-16 sm:pt-28 md:pb-0"
    >
      <div className="absolute inset-0 brand-gradient" aria-hidden />

      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={heroSlides[index].src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 sm:inset-[-3%]"
              style={
                enableParallax
                  ? { x: parallaxX, y: parallaxY, scale: 1.04 }
                  : undefined
              }
            >
              <Image
                src={heroSlides[index].src}
                alt={heroSlides[index].alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center opacity-45 mix-blend-luminosity"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 brand-vignette" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-b from-dark/40 via-dark/10 to-dark/75 sm:from-dark/30 sm:via-transparent sm:to-dark/70"
          aria-hidden
        />
      </div>

      {!reduceMotion ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-[16%] right-[8%] hidden h-28 w-28 rounded-full bg-white/10 blur-3xl sm:block sm:h-40 sm:w-40 md:right-[12%]"
            animate={{ y: [0, -18, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-[18%] left-[6%] hidden h-20 w-20 rounded-full bg-accent/30 blur-2xl sm:block sm:h-28 sm:w-28 md:left-[8%]"
            animate={{ y: [0, 16, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}

      <div className="container-page relative z-10 w-full min-w-0">
        <div className="w-full min-w-0 max-w-3xl">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="w-full max-w-full break-words font-semibold leading-[1.1] text-[clamp(1.7rem,6vw+0.4rem,4.5rem)]"
          >
            <span className="block">Capturing Moments.</span>
            <span className="mt-0 block sm:mt-0">
              Creating Timeless
              <span className="block sm:inline"> Memories.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4 }}
            className={`mt-4 w-full max-w-xl text-pretty break-words text-[clamp(0.875rem,2.8vw+0.35rem,1.125rem)] leading-relaxed text-white/80 sm:mt-6 ${
              isShort ? "line-clamp-3 sm:line-clamp-none" : ""
            }`}
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55 }}
            className="mt-7 flex w-full max-w-full flex-row flex-wrap gap-3 sm:mt-10 sm:gap-4"
          >
            <MagneticButton
              href="/#contact"
              variant="light"
              className="min-w-0 flex-1 px-4 py-3 text-xs sm:flex-none sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Book a Session
            </MagneticButton>
            <MagneticButton
              href="/#portfolio"
              variant="secondary"
              className="min-w-0 flex-1 px-4 py-3 text-xs sm:flex-none sm:px-7 sm:py-3.5 sm:text-sm"
            >
              View Portfolio
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <Link
        href="/#about"
        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/70 transition hover:text-white sm:bottom-8 sm:gap-2"
        aria-label="Scroll to about section"
      >
        <span className="text-[9px] uppercase tracking-[0.28em] sm:text-[10px]">
          Scroll
        </span>
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
