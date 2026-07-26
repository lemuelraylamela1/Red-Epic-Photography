export type NavItem = {
  label: string;
  href: string;
};

export type HeroSlide = {
  src: string;
  alt: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type PortfolioCategory =
  | "All"
  | "Wedding"
  | "Portrait"
  | "Family"
  | "Corporate"
  | "Lifestyle"
  | "Events";

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  src: string;
  alt: string;
  height: "short" | "medium" | "tall";
};

export type Reason = {
  id: string;
  title: string;
  description: string;
  icon: "camera" | "sparkles" | "award" | "zap" | "image" | "heart";
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  alt: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram";
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  mapEmbedLabel: string;
};
