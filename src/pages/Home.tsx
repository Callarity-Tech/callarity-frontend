"use client";

import CtaSection from "../components/home-sections/CtaSection";
import FeaturesSection from "../components/home-sections/FeaturesSection";
import HeroSection from "../components/home-sections/HeroSection";
import PricingSection from "../components/home-sections/PricingSection";
import PromoSection from "../components/home-sections/PromoSection";

export default function Home() {
  return (
    <div className="relative flex bg-black flex-col items-center justify-center  text-white ">

      {/* HERO SECTION */}

      <HeroSection />

      {/* WHY CHOOSE US SECTION */}

      <FeaturesSection />

      {/* CTA SECTION */}

   <div className="w-full relative
  
   ">
        <PromoSection />
      </div>

      <PricingSection />

      <CtaSection />


    </div>
  );
}
