import Image from "next/image";
import { aboutContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="section-padding bg-off-white">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal direction="left">
          <div className="relative">
            <div className="absolute -top-6 -left-6 hidden h-28 w-28 rounded-full bg-accent/10 blur-2xl lg:block" />
            <div className="relative overflow-hidden">
              <Image
                src={aboutContent.image}
                alt={aboutContent.imageAlt}
                width={900}
                height={1100}
                className="h-[28rem] w-full object-cover sm:h-[34rem] lg:h-[40rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/35 via-transparent to-transparent" />
            </div>
            <div className="absolute right-4 bottom-4 bg-white/95 px-6 py-5 shadow-soft backdrop-blur sm:right-[-1.5rem] sm:bottom-10">
              <p className="font-heading text-4xl font-semibold text-primary">
                {aboutContent.years}
              </p>
              <p className="mt-1 text-sm tracking-wide text-muted">
                {aboutContent.yearsLabel}
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              eyebrow={aboutContent.eyebrow}
              title={aboutContent.title}
              description={aboutContent.story}
            />
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <Reveal delay={0.1}>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">
                  Mission
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {aboutContent.mission}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">
                  Vision
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {aboutContent.vision}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <blockquote className="mt-10 border-l-2 border-accent pl-6 text-lg leading-relaxed text-body/90 italic sm:text-xl">
              {aboutContent.philosophy}
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
