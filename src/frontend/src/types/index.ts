export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: "purple" | "cyan" | "blue";
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  description: string;
  results: { metric: string; value: string }[];
  imageUrl: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

export interface BlogArticle {
  id: bigint;
  title: string;
  body: string;
  tags: string[];
  publishedAt: bigint;
  author: string;
  featuredImageUrl: string;
  excerpt: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  serviceType: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: string[];
}
