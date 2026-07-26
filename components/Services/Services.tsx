"use client";

import { ArrowRight, Check } from "lucide-react";
import { serviceProcess, services } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="What we offer—clearly defined."
            description="Portfolio shows the work. Here you’ll find what each session includes and how we work together from inquiry to delivery."
            align="center"
            className="mb-14"
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-dark/8 bg-dark/8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.04}>
              <article className="flex h-full flex-col bg-white p-7 sm:p-8">
                <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-body">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-dark/8 pt-5">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-body/80">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* <div className="mt-20 sm:mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Process"
              title="A simple path from hello to gallery."
              description="No guesswork—just a clear flow so you always know what happens next."
              align="center"
              className="mb-12"
            />
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {serviceProcess.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <div className="relative">
                  <p className="font-heading text-4xl font-semibold text-primary/15">
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-body">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:mt-16 sm:flex-row">
            <MagneticButton href="/#portfolio" variant="ghost">
              See the work
              <ArrowRight size={16} aria-hidden />
            </MagneticButton>
            <MagneticButton href="/#contact">Book a Session</MagneticButton>
          </div>
        </Reveal> */}
      </div>
    </section>
  );
}
