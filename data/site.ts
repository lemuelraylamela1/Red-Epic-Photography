import type {
  ContactInfo,
  HeroSlide,
  NavItem,
  PortfolioCategory,
  PortfolioItem,
  Reason,
  Service,
  SocialLink,
  Testimonial,
} from "@/types";

export const siteConfig = {
  name: "Red Epic Photography",
  shortName: "Red Epic Photo",
  wordmark: "RED EPIC PHOTO",
  tagline: "Capturing Moments.\nCreating Timeless Memories.",
  description:
    "Red Epic Photography preserves life's most meaningful moments through cinematic, timeless imagery—crafted with elegance, emotion, and precision.",
  url: "https://redepicphotography.com",
  logo: "/images/logo-red-epic.png",
  mark: "/icons/red-epic-mark.svg",
};

export const navigation: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export const heroSlides: HeroSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=80",
    alt: "Bride and groom walking through soft golden light",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2400&q=80",
    alt: "Intimate wedding portrait with cinematic shadows",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2400&q=80",
    alt: "Elegant couple portrait in natural light",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2400&q=80",
    alt: "Romantic prenup moment framed in soft focus",
  },
];

export const aboutContent = {
  eyebrow: "Our Story",
  title: "Photography shaped by emotion and craft.",
  story:
    "Red Epic Photography was founded on a simple belief: the most powerful images are not staged—they are felt. We approach every session with intention, patience, and a cinematic eye for light, gesture, and atmosphere.",
  mission:
    "To create imagery that feels timeless—preserving the quiet glances, bold celebrations, and intimate details that define your story.",
  vision:
    "To be the studio families and brands trust when moments matter most—where artistry, professionalism, and human connection meet.",
  philosophy:
    "Less noise. More meaning. We let photography lead, using composition and light to reveal emotion rather than decorate it.",
  years: "10+",
  yearsLabel: "Years of experience",
  image:
    "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Photographer adjusting a camera in a softly lit studio",
};

export const services: Service[] = [
  {
    id: "wedding",
    title: "Wedding Photography",
    description:
      "Full-day coverage that captures ceremony, celebration, and every quiet moment in between.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Wedding couple holding hands during a ceremony",
  },
  {
    id: "prenup",
    title: "Prenup Photography",
    description:
      "Romantic, editorial sessions designed to tell your love story before the big day.",
    image:
      "https://images.unsplash.com/photo-1529634596773-5c84c3b0f3c5?auto=format&fit=crop&w=1200&q=80",
    alt: "Couple embracing during a prenup photoshoot",
  },
  {
    id: "portrait",
    title: "Portrait Photography",
    description:
      "Refined individual and couple portraits with polished lighting and natural expression.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80",
    alt: "Elegant studio portrait of a woman",
  },
  {
    id: "family",
    title: "Family Photography",
    description:
      "Warm, authentic family sessions that feel effortless and beautifully composed.",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80",
    alt: "Family walking together outdoors at sunset",
  },
  {
    id: "corporate",
    title: "Corporate Photography",
    description:
      "Professional headshots and brand imagery that communicate clarity and trust.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    alt: "Corporate professional in a refined portrait",
  },
  {
    id: "events",
    title: "Events",
    description:
      "From private gatherings to milestone celebrations—documented with cinematic presence.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    alt: "Guests celebrating at an elegant evening event",
  },
];

export const portfolioCategories: PortfolioCategory[] = [
  "All",
  "Wedding",
  "Portrait",
  "Family",
  "Corporate",
  "Lifestyle",
  "Events",
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Garden Ceremony",
    category: "Wedding",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    alt: "Bride and groom walking among trees",
    height: "tall",
  },
  {
    id: "p2",
    title: "Soft Light Portrait",
    category: "Portrait",
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80",
    alt: "Close-up portrait with soft window light",
    height: "medium",
  },
  {
    id: "p3",
    title: "Family Afternoon",
    category: "Family",
    src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80",
    alt: "Parents and child walking through a field",
    height: "short",
  },
  {
    id: "p4",
    title: "Executive Presence",
    category: "Corporate",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    alt: "Business portrait against a dark backdrop",
    height: "tall",
  },
  {
    id: "p5",
    title: "Golden Hour Love",
    category: "Lifestyle",
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    alt: "Couple sharing a quiet moment at sunset",
    height: "medium",
  },
  {
    id: "p6",
    title: "Reception Glow",
    category: "Events",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    alt: "Guests dancing under warm reception lights",
    height: "short",
  },
  {
    id: "p7",
    title: "Veil in Motion",
    category: "Wedding",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    alt: "Bride with flowing veil in dramatic light",
    height: "tall",
  },
  {
    id: "p8",
    title: "Quiet Strength",
    category: "Portrait",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    alt: "Natural light portrait with soft expression",
    height: "medium",
  },
  {
    id: "p9",
    title: "Weekend Rituals",
    category: "Family",
    src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1200&q=80",
    alt: "Family laughing together outdoors",
    height: "short",
  },
  {
    id: "p10",
    title: "Brand Identity",
    category: "Corporate",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    alt: "Professional woman in a confident corporate portrait",
    height: "medium",
  },
  {
    id: "p11",
    title: "City Stroll",
    category: "Lifestyle",
    src: "https://images.unsplash.com/photo-1529634596773-5c84c3b0f3c5?auto=format&fit=crop&w=1200&q=80",
    alt: "Couple walking through an urban setting",
    height: "tall",
  },
  {
    id: "p12",
    title: "Celebration Night",
    category: "Events",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    alt: "Event tables styled for an elegant celebration",
    height: "short",
  },
];

export const reasons: Reason[] = [
  {
    id: "r1",
    title: "Professional Equipment",
    description:
      "Cinema-grade cameras, lenses, and lighting for refined, high-resolution results.",
    icon: "camera",
  },
  {
    id: "r2",
    title: "Creative Direction",
    description:
      "Thoughtful posing and artful guidance that feel natural, never forced.",
    icon: "sparkles",
  },
  {
    id: "r3",
    title: "Years of Experience",
    description:
      "A decade of sessions across weddings, families, portraits, and brands.",
    icon: "award",
  },
  {
    id: "r4",
    title: "Fast Delivery",
    description:
      "Carefully edited galleries delivered with clear timelines and communication.",
    icon: "zap",
  },
  {
    id: "r5",
    title: "High Resolution Images",
    description:
      "Print-ready files prepared for albums, frames, and digital keepsakes.",
    icon: "image",
  },
  {
    id: "r6",
    title: "Customer Satisfaction",
    description:
      "A calm, premium experience from first inquiry through final delivery.",
    icon: "heart",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Angela & Marco",
    role: "Wedding Clients",
    quote:
      "Every frame felt intentional. Red Epic captured our wedding with a quiet elegance we will treasure forever.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    alt: "Portrait of Angela smiling",
  },
  {
    id: "t2",
    name: "Patricia Reyes",
    role: "Family Session",
    quote:
      "The photos feel like us—warm, honest, and beautifully composed. The entire experience was effortless.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    alt: "Portrait of Patricia Reyes",
  },
  {
    id: "t3",
    name: "Daniel Cruz",
    role: "Corporate Client",
    quote:
      "Our brand portraits look premium and trustworthy. Exact, polished craftsmanship from start to finish.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    alt: "Portrait of Daniel Cruz",
  },
  {
    id: "t4",
    name: "Sofia Lim",
    role: "Prenup Session",
    quote:
      "Cinematic without being dramatic for drama's sake. The images feel timeless and deeply personal.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    alt: "Portrait of Sofia Lim",
  },
];

export const ctaContent = {
  title: "Let's Capture Your Story Together",
  subtitle:
    "From intimate portraits to unforgettable celebrations—your moments deserve imagery that lasts.",
  buttonLabel: "Book Your Session",
  background:
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2400&q=80",
  backgroundAlt: "Couple embracing in soft cinematic light",
};

export const contactInfo: ContactInfo = {
  email: "redepicphotography@gmail.com",
  phone: "+63 917 939 9007",
  address: "Butuan City, Philippines",
  mapEmbedLabel: "Google Map of Butuan City, Philippines",
};

export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/redepicprod",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/redepicphoto/",
    icon: "instagram",
  },
];
