"use client";

import Image from "next/image";
import { services } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Crafted sessions for every chapter."
            description="From weddings to brand portraits, each offering is designed with cinematic intention and refined direction."
            align="center"
            className="mb-14"
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06}>
              <article className="group relative overflow-hidden bg-light-gray transition duration-500 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {service.description}
                    </p>
                  </div>
                </div>
                <span className="absolute top-0 left-0 h-full w-[3px] origin-top scale-y-0 bg-accent transition duration-500 group-hover:scale-y-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
