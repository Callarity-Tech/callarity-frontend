"use client";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
  useReducedMotion,
} from "framer-motion";
import { useRef, useMemo } from "react";
import ServicesCard from "../ui/ServicesCard";

type WordProps = {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function Word({ word, index, total, progress }: WordProps) {
  const shouldReduceMotion = useReducedMotion();
  

  const span = .4 / total; 
  const overlap = .75
  
  const start = index * span * (1 - overlap);
  const end = Math.min(start + span, 1);


  const y = useTransform(progress, [start, end], [10, 0]);
  
  const opacity = useTransform(progress, [start, end], [0, 1]);
  
  

  // Reduced motion support
  if (shouldReduceMotion) {
    return (
      <span style={{ display: "inline-block", marginRight: "4rem" }}>
        {word}
      </span>
    );
  }

  return (
    <motion.span
      style={{
        y,
        opacity,
        display: "inline-block",
        marginRight: "0.4rem",
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 0,
      }}
    >
      {word}
    </motion.span>
  );
}

function FeaturesSection() {
  const ref = useRef(null);


  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 60%"], // Adjusted for longer animation duration
  });

  // Smoother spring configuration
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 35,
    mass: 0.8,
    restDelta: 0.001,
  });

  const title1 = "Reasons to Choose Callarity";
  const title2 = "For Your Business";

  const words1 = useMemo(() => title1.split(" "), []);
  const words2 = useMemo(() => title2.split(" "), []);

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
    <section
      ref={ref}
      className="relative w-full py-32 px-4 border-t border-gray-800 overflow-hidden"
    >
      {/* Optimized background visuals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10" />
        <motion.div
          className="absolute top-1/3 -right-40 w-96 h-96 bg-pink-500/15 rounded-full blur-[100px]"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -left-40 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 14, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Optimized scroll-synced word animation */}
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 flex justify-center flex-wrap">
            {words1.map((word, i) => (
              <Word
                key={i}
                word={word}
                index={i}
                total={words1.length}
                progress={smoothProgress}
              />
            ))}
          </h2>

          <h3 className="text-4xl md:text-5xl font-bold text-gray-400 mb-6 flex justify-center flex-wrap">
            {words2.map((word, i) => (
              <Word
                key={i}
                word={word}
                index={i + words1.length}
                total={words2.length}
                progress={smoothProgress}
              />
            ))}
          </h3>

          <motion.p 
            className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unlock next-gen customer engagement. Automate personalized voice
            outreach, boost responses, and scale 24/7 with Callarity's
            AI-driven voice automation—no extra agents needed.
          </motion.p>
        </div>

        {/* Optimized feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {whyChooseFeatures.map((feature, i) => (
            <motion.div
              key={i}
              className="h-full"
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 }
              }}
            >
              <ServicesCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;