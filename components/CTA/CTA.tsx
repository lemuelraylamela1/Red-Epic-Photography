import Image from "next/image";
import { ctaContent } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-28 text-white sm:py-36">
      <Image
        src={ctaContent.background}
        alt={ctaContent.backgroundAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-dark/70" />
      <div className="absolute inset-0 brand-vignette opacity-70" />

      <div className="container-page relative z-10 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold sm:text-5xl lg:text-6xl">
            {ctaContent.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
            {ctaContent.subtitle}
          </p>
          <div className="mt-10">
            <MagneticButton href="/#contact" variant="light">
              {ctaContent.buttonLabel}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
