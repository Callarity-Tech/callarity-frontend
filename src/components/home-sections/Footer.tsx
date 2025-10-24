"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0b0d13] border-t border-white/10 text-gray-400 overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_center,rgba(167,139,250,0.06),transparent_70%)] pointer-events-none"></div>

      {/* CALLARITY glowing text in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
        <ShinyOutlineText />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid gap-10">
        {/* Top Row */}
        <div className="grid gap-6 md:grid-cols-[auto_1fr] items-center justify-between border-b border-white/10 pb-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img
              src="callaritylogo.png"
              alt="Callarity logo"
              className="w-9 h-9 rounded-md object-contain"
            />
            <div>
              <h3 className="text-white font-bold text-lg">Callarity</h3>
              <p className="text-sm text-gray-500">
                AI voice agent that talks like humans
              </p>
            </div>
          </div>

          {/* Subscribe */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-2 max-w-sm ml-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-tr from-cyan-300 to-purple-400 rounded-lg font-semibold text-[#0b0d13] text-sm hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-sm">
          {[
            {
              title: "Product",
              links: ["Overview", "Live Demo", "Pricing", "Changelog"],
            },
            {
              title: "Solutions",
              links: ["Coaching Centers", "Clinics", "Real Estate", "Custom"],
            },
            {
              title: "Developers",
              links: ["Docs", "API Reference", "Status", "Open Source"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Contact", "Privacy"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-gray-300 mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="relative group transition text-gray-400 hover:text-white"
                    >
                      {link}
                      <span className="absolute left-0 bottom-[-2px] h-[1px] w-0 bg-gradient-to-r from-cyan-300 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-gray-500 gap-4">
          <span>© {year} Callarity. All rights reserved.</span>
          <div className="flex gap-3">
            {["X", "Li", "Gh"].map((label) => (
              <a
                key={label}
                href="#"
                className="flex items-center justify-center w-8 h-8 border border-white/10 rounded-md bg-white/[0.03] hover:border-white/30 transition"
              >
                <span className="text-[11px] opacity-70">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* === Glowing Outline Text === */
function ShinyOutlineText() {
  return (
    <motion.h1
      className="font-extrabold text-[clamp(64px,20vw,260px)] leading-[0.8] text-transparent tracking-wider uppercase [-webkit-text-stroke:2px_rgba(255,255,255,0.2)] select-none"
      animate={{
        backgroundPosition: ["200% center", "-200% center"],
      }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{
        background:
          "linear-gradient(90deg, rgba(167,139,250,0.8), rgba(255,255,255,0.9), rgba(103,232,249,0.8))",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        WebkitTextStroke: "2px transparent",
        mixBlendMode: "screen",
      }}
    >
      CALLARITY
    </motion.h1>
  );
}
