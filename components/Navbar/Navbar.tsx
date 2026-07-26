"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";

const sectionIds = [
  "home",
  "about",
  "services",
  "portfolio",
  "why-us",
  "testimonials",
  "contact",
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrollPast, setScrollPast] = useState(false);
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const drawerTitleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrolled = !isHome || scrollPast;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrollPast(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Desktop only: transparent over hero. Mobile always uses solid contrast.
  const isLightDesktop = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        // Mobile: always solid white so logo + menu stay readable
        "border-b border-dark/5 bg-white/90 shadow-[0_10px_40px_rgba(52,0,6,0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/80",
        // Desktop: keep transparent → white on scroll
        isLightDesktop
          ? "lg:border-transparent lg:bg-transparent lg:shadow-none lg:backdrop-blur-none"
          : "lg:border-dark/5 lg:bg-white/90 lg:shadow-[0_10px_40px_rgba(52,0,6,0.06)] lg:backdrop-blur-xl",
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between lg:h-20">
        <div className="lg:hidden">
          <Logo variant="brand" />
        </div>
        <div className="hidden lg:block">
          <Logo variant={isLightDesktop ? "light" : "brand"} />
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navigation.map((item) => {
            const id = item.href.split("#")[1] ?? "";
            const active = isHome && activeId === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm tracking-wide transition-colors",
                  isLightDesktop
                    ? "text-white/80 hover:text-white"
                    : "text-body/70 hover:text-primary",
                  active && (isLightDesktop ? "text-white" : "text-primary"),
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300",
                    active && "scale-x-100",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            href="/#contact"
            variant={isLightDesktop ? "secondary" : "primary"}
            className="!px-5 !py-2.5 text-xs uppercase tracking-[0.18em]"
          >
            Book a Session
          </MagneticButton>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary text-white shadow-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={drawerTitleId}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-page flex h-full flex-col pt-24 pb-10">
              <div className="mb-10 flex items-center justify-between">
                <h2 id={drawerTitleId} className="wordmark text-xs text-primary">
                  Menu
                </h2>
                <button
                  ref={closeRef}
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-dark/10"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-6" aria-label="Mobile">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="text-3xl font-semibold text-body"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto">
                <MagneticButton
                  href="/#contact"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Book a Session
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
