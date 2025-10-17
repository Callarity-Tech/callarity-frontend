import { motion } from "framer-motion";
import ServicesCard from "../ui/ServicesCard";

function FeaturesSection() {
    
const whyChooseFeatures = [
  {
    title: "AI Voice Expertise That Converts",
    desc: "Our team blends NLP, voice tech, and regional language fluency to craft AI callers that sound natural and drive real outcomes — from appointment bookings to feedback collection.",
    icon: "✨",
    glowColor: "rgba(255, 60, 60, 0.35)",
  },
  {
    title: "Industry-Specific, Goal-Oriented AI Call Automation",
    desc: "No two businesses are alike. Whether you're a real estate broker or a coaching center, we customize scripts and call flows to match your exact needs and tone.",
    icon: "💡",
    glowColor: "rgba(60, 255, 100, 0.35)",
  },
  {
    title: "Natural, Multilingual Communication",
    desc: "Stand out with AI that speaks like your customers — in Hindi, Tamil, Marathi, Bengali, and more. No robotic tones. Just natural conversations.",
    icon: "🎙️",
    glowColor: "rgba(60, 180, 255, 0.35)",
  },
  {
    title: "Mobile-Ready Voice Stack",
    desc: "Our AI voice system is optimized for mobile-first users, ensuring smooth delivery and crystal-clear quality for recipients on any device.",
    icon: "📱",
    glowColor: "rgba(255, 200, 60, 0.35)",
  },
  {
    title: "Smart Outreach & Follow-Up Logic",
    desc: "Our AI doesn't just call — it follows up, handles objections, collects responses, and syncs everything to your CRM for precise lead tracking.",
    icon: "⚡",
    glowColor: "rgba(255, 80, 200, 0.35)",
  },
  {
    title: "Call Analytics & Optimization",
    desc: "Track pickup rates, call durations, and user sentiments. With Callarity's analytics dashboard, you're always improving and closing faster.",
    icon: "📊",
    glowColor: "rgba(100, 255, 255, 0.35)",
  },
];
  return (
<section className="relative w-full py-32 px-4 border-t border-gray-800 overflow-hidden">
        {/* Background visuals */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10" />

          {/* Animated blobs */}
          <motion.div
            className="absolute top-1/3 -right-40 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 -left-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Reasons to Choose Callarity
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-400 mb-6">
              For Your Business
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
              Unlock next-gen customer engagement. Automate personalized voice
              outreach, boost responses, and scale 24/7 with Callarity’s
              AI-driven voice automation—no extra agents needed.
            </p>
          </motion.div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {whyChooseFeatures.map((feature, i) => (
              <motion.div
                key={i}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <ServicesCard feature={feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection;