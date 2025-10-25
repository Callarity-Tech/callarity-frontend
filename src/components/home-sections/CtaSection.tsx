"use client";
import { motion } from "framer-motion";
import logo from "../../assets/callaritylogo.svg";

export default function CtaSection() {
  const year = new Date().getFullYear();

  return (
    <section className="relative w-full overflow-hidden bg-[#000000]">
      {/* Background logo image */}
     

      {/* CTA content */}
      <div className="max-w-3xl border-t border-white/15  mx-auto text-center relative z-10 py-24 px-4">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Ready to scale your conversations?
        </motion.h3>

        <motion.p
          className="text-gray-400 text-lg mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Join businesses already using Callarity AI to automate their voice
          communication — and sound more human while doing it.
        </motion.p>

        <motion.button
          className="px-8 py-3 bg-white text-black font-semibold rounded-3xl hover:bg-gray-200 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Request Demo
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 text-gray-400">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_center,rgba(167,139,250,0.06),transparent_70%)] pointer-events-none"></div>
 <img
        src={logo}
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-5 pointer-events-none select-none z-0"
      />
        {/* Glowing CALLARITY text behind content */}
        <div className="absolute bottom-0 inset-0 flex items-center justify-center opacity-[0.04]">
          {/* <ShinyOutlineText /> */}
        </div>

        {/* Footer content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid gap-10">
          {/* Top row: logo + subscribe */}
          <div className="grid gap-6 md:grid-cols-[auto_1fr] items-center justify-between border-b border-white/10 pb-8">
            <div className="flex items-center gap-3">
              <img
                src={logo}
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
                className="px-4 py-2 bg-gradient-to-tr from-red-700 to-red-400 rounded-lg font-semibold text-[#ffffff] text-sm hover:opacity-90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links */}
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
                <h4 className="font-semibold text-gray-300 mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="relative group transition text-gray-400 hover:text-white"
                      >
                        {link}
                        <span className="absolute left-0 bottom-[-2px] h-[1px] w-0 bg-gradient-to-r from-red-300 to-red-400 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
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
    </section>
  );
}

