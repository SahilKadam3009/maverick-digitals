import { CaseStudiesCarousel } from "@/components/home/CaseStudiesCarousel";
import { CtaSection } from "@/components/home/CtaSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export function Home() {
  return (
    <div className="relative">
      {/* Hero — full viewport */}
      <HeroSection />

      {/* Stats strip */}
      <StatsSection />

      {/* Services — asymmetric grid with 3D tilt */}
      <ServicesSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Case Studies coverflow */}
      <CaseStudiesCarousel />

      {/* Testimonials — orbit animation */}
      <TestimonialsSection />

      {/* Process timeline */}
      <ProcessSection />

      {/* FAQ accordion */}
      <FaqSection />

      {/* Final CTA */}
      <CtaSection />
    </div>
  );
}
