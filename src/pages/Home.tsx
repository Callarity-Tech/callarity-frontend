"use client";

import CtaSection from "../components/home-sections/CtaSection";
import FeaturesSection from "../components/home-sections/FeaturesSection";
import HeroSection from "../components/home-sections/HeroSection";
import PromoSection from "../components/home-sections/PromoSection";

export default function Home() {
  return (
    <div className="relative flex bg-black flex-col items-center justify-center  text-white overflow-hidden">

      {/* HERO SECTION */}

      <HeroSection />

      {/* WHY CHOOSE US SECTION */}

      <FeaturesSection />

      {/* CTA SECTION */}

<PromoSection />

      <CtaSection />


    </div>
  );
}
