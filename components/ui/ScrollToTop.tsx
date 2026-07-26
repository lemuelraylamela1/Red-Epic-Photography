"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 500);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          className="fixed right-5 bottom-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-primary/90 text-white shadow-[0_12px_35px_rgba(52,0,6,0.28)] backdrop-blur-md transition-colors hover:bg-accent sm:right-7 sm:bottom-7"
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduceMotion ? "auto" : "smooth",
            })
          }
        >
          <ArrowUp size={20} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
