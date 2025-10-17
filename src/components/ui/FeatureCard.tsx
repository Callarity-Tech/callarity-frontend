import { motion } from "framer-motion";
import { useState } from "react";

interface Feature {
  title: string;
  desc: string;
  icon: React.ReactNode;
  glowColor: string;
}
export default function FeatureCard({
  feature,
}: {
  feature: (Feature);
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ y: -5 }}
      className="relative p-8 rounded-xl h-full bg-[#ffffff08] border border-white/10 overflow-hidden group transition-all duration-300"
    >
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${feature.glowColor}, transparent 70%)`,
            opacity: 1,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg group-hover:bg-white/30 transition-colors">
            {feature.icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {feature.desc}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-white font-medium text-sm hover:text-blue-400 transition-colors group/link"
        >
          Learn More
          <span className="transition-transform group-hover/link:translate-x-1">
            →
          </span>
        </a>
      </div>
    </motion.div>
  );
}