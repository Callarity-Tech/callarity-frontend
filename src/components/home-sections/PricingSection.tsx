import { motion } from "framer-motion";
import paperTex from "../../assets/paper-texture.webp";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      desc: "Perfect for demos & testing your AI agent.",
      features: ["1 Agent Voice", "Basic Call Flow", "Local-only Logs"],
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹999 / month",
      desc: "For small businesses running real customer calls.",
      features: ["Unlimited Calls", "Dashboard + Logs", "Custom Persona Voices"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      desc: "White-label + SLA + On-prem + API Integration.",
      features: ["AI Tool Calling", "Database Sync", "Dedicated Support"],
      highlight: false,
    },
  ];

  return (
    <div id="pricing" className="min-h-screen w-full relative flex flex-col items-center justify-center bg-[#000] text-white px-6 py-16">
      <img src={paperTex} className="w-full h-full absolute opacity-20 top-0 left-0 object-cover" alt="" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5, ease: "easeOut" }}
        className="text-4xl font-bold mb-12 text-center z-10"
      >
        Simple, Transparent <span className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">Pricing</span>
      </motion.h2>

      <div className="w-full max-w-5xl grid md:grid-cols-3 gap-8 z-10">
        {plans.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6, delay: i * 0.15 }}
            className={`rounded-xl border border-white/10 p-6 backdrop-blur-sm bg-[#5757574b]
              ${p.highlight ? "shadow-red-400/40 shadow-2xl scale-[1.03]" : "shadow-lg shadow-black/40"}`}
          >
            <h3 className="text-2xl font-semibold mb-2">{p.name}</h3>
            <p className="text-red-300 text-xl font-bold mb-3">{p.price}</p>
            <p className="text-gray-300 text-sm mb-6">{p.desc}</p>

            <ul className="space-y-2 mb-6 text-sm text-gray-200">
              {p.features.map((f, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-red-300">✔</span> {f}
                </li>
              ))}
            </ul>

            <button className={`w-full py-2 rounded-lg font-semibold transition
              ${p.highlight ? "bg-red-600 hover:bg-red-800" : "bg-[#3e3e3e] hover:bg-[#4b4b4b]"}`}>
              {p.highlight ? "Upgrade Now" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
