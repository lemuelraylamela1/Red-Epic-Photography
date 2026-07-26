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
  includes: string[];
};

export type ServiceProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
};

export type PortfolioCategory =
  | "All"
  | "Wedding"
  | "Prenup"
  | "Portrait"
  | "Family"
  | "Corporate"
  | "Lifestyle"
  | "Events";

export type PortfolioPhoto = {
  src: string;
  alt: string;
};

export type PortfolioAlbum = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  cover: string;
  coverAlt: string;
  height: "short" | "medium" | "tall";
  photos: PortfolioPhoto[];
};

/** @deprecated Use PortfolioAlbum */
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
