import {
  Award,
  Camera,
  Heart,
  Image as ImageIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import { reasons } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = {
  camera: Camera,
  sparkles: Sparkles,
  award: Award,
  zap: Zap,
  image: ImageIcon,
  heart: Heart,
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding bg-white">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="A premium experience, quietly executed."
            description="Every detail—from creative direction to delivery—is designed to feel calm, intentional, and exceptional."
            align="center"
            className="mb-14"
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = icons[reason.icon];
            return (
              <Reveal key={reason.id} delay={index * 0.05}>
                <article className="group h-full border border-dark/5 bg-off-white p-8 transition duration-500 hover:-translate-y-1 hover:border-accent/20 hover:shadow-soft">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-accent shadow-sm transition group-hover:bg-accent group-hover:text-white">
                    <Icon size={22} aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold text-body">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
