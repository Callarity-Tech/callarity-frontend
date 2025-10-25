import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const cards = [
  {
    heading: "Call Flow",
    bullets: [
      "Callarity AI instantly converts speech to text with high accuracy.",
      "Maintains accuracy even in regional and code-mixed languages.",
      "Understands intent, emotion, and context for natural responses.",
    ],
    img: "https://i.pinimg.com/474x/ba/92/6a/ba926ae6bcb0aa377cab8bfa2b91090e.jpg",
  },
  {
    heading: "Integration Flow",
    bullets: [
      "Natural multilingual voices respond within milliseconds.",
      "Understands intent, emotion, and context for natural responses.",
      "Every interaction can trigger automated follow-ups.",
    ],
    img: "https://i.pinimg.com/1200x/97/51/fa/9751fac2fa49f245b81d6a81f9854bb3.jpg",
  },
  {
    heading: "Automation Flow",
    bullets: [
      "Sync leads, responses, and updates automatically.",
      "Triggers follow-ups in CRMs, WhatsApp, or Google Sheets automatically.",
      "Enhances automation and productivity seamlessly.",
    ],
    img: "https://i.pinimg.com/736x/b8/0e/49/b80e494bf559390355d59179a11e5cba.jpg",
  },
];

export default function CinematicScroll() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex justify-center flex-col items-center w-full relative">
         <div className="text-center max-w-5xl mx-auto px-4 border-b border-white/20 pb-20">
        <h3 className="text-4xl md:text-5xl font-bold leading-snug mb-6 tracking-tight">
          How Callarity Uses AI Voice to Power{" "}
          <span className="bg-gradient-to-r from-red-500 via-pink-400 to-white bg-clip-text text-transparent">
            Human-Like
          </span>
          , Automated Conversations
        </h3>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
          Callarity combines STT, NLP, and TTS to build voice agents that sound
          truly human. Our AI listens, understands, and responds naturally —
          automating thousands of customer calls daily with real-time context
          and multilingual fluency.
        </p>
      </div>
      <div className="relative w-full max-w-5xl text-white">
        <div className="flex w-full">
          {/* Left sidebar sticky */}
          <div className="w-1/2 sticky top-0 px-4 h-screen flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-5xl mb-6 font-bold bg-gradient-to-r from-red-300 via-red-600 to-red-800 bg-clip-text text-transparent">
                  {cards[activeIndex].heading}
                </h2>
          
                {cards[activeIndex].bullets && (
                  <ul className="list-disc text-lg ml-4 max-w-sm text-gray-400 space-y-2">
                    {cards[activeIndex].bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right scrollable content */}
          <div className="w-1/2 relative flex flex-col gap-24 justify-center items-center">
            {cards.map((card, idx) => (
              <Section
                key={idx}
                card={card}
                idx={idx}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  card,
  idx,
  activeIndex,
  setActiveIndex,
}: {
  card: { heading: string; bullets?: string[]; img: string };
  idx: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [ref, inView] = useInView({
    threshold: 0.6,
  });

  useEffect(() => {
    if (inView && activeIndex !== idx) setActiveIndex(idx);
  }, [inView, idx, activeIndex, setActiveIndex]);

  return (
    <div
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center px-12"
    >
      <motion.img
        src={card.img}
        alt={card.heading}
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: activeIndex >= idx ? -idx * 60 : 100,
          opacity: activeIndex >= idx ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute right-0 rounded-xl shadow-2xl w-full aspect-square object-cover object-center"
        style={{ zIndex: idx }}
      />
    </div>
  );
}
