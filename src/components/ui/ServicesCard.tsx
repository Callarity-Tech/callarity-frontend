"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Feature {
  title: string;
  desc: string;
  icon: React.ReactNode;
  glowColor: string;
}

export default function ServicesCard({ feature }: { feature: Feature }) {
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
      whileHover={{ scale: 1.05 }}
      style={{ perspective: 1000 }}
      className="relative peer p-8 rounded-2xl h-full bg-[#ffffff05] border border-white/10 overflow-hidden cursor-pointer"
    >
      {/* Tilted inner content */}
      <motion.div
       
        className="relative z-10 transition-transform duration-0"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl group-hover:bg-white/20 transition-colors">
            {feature.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{feature.desc}</p>
        <motion.a
          href="#"
          className="inline-flex peer-hover:text-black items-center gap-2 text-white font-medium text-sm hover:text-blue-400 transition-colors"
          whileHover={{ x: 5 }}
        >
          Learn More →
        </motion.a>
      </motion.div>

      {/* Glow effect */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            key="glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${feature.glowColor}, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      
    </motion.div>
  );
}
