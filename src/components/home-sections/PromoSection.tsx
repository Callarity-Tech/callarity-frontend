import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import promo_auto_img from "../../assets/promo_integration_flow.png";
import promo_call_img from "../../assets/promo_call_flow.png";
import paper from "../../assets/paper-texture.webp";
const cards = [
  {
    heading: "Call Flow",
    bullets: [
      "Callarity AI instantly converts speech to text with high accuracy.",
      "Maintains accuracy even in regional and code-mixed languages.",
      "Understands intent, emotion, and context for natural responses.",
    ],
    img: promo_call_img,
  },
  {
    heading: "Automation Flow",
    bullets: [
      "Sync leads, responses, and updates automatically.",
      "Triggers follow-ups in CRMs, WhatsApp, or Google Sheets automatically.",
      "Enhances automation and productivity seamlessly.",
    ],
    img: promo_auto_img,
  },
];

export default function CinematicScroll() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex justify-center flex-col items-center w-full relative bg-white/5 pt-24 bg-gradient-to-b from-gray-900 via-gray-800 to-black 
    bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] 
    bg-[size:24px_24px] ">
    

      <img src={paper} className=" w-full h-full absolute top-0 opacity-10" />

      <span className="absolute top-50 left-0 w-[30%] h-40 bg-red-400 blur-[600px]"></span>
         <span className="absolute top-[150vh] w-[50%] h-40 bg-white blur-[1000px]"></span>

      <div className="text-center max-w-6xl z-1 mx-auto px-4 border- border-white/20 pb-12">
        <h3 className="text-4xl md:text-5xl font-bold leading-snug mb-6 tracking-tight">
          How Callarity Uses AI Voice to Power{" "}<br/>
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

      <div className="relative w-full max-w-5xl text-white rounded-2xl border-white/30 border ">
        <div className="flex w-full">
          {/* Left sidebar sticky */}
          <div className="w-1/2 sticky top-0 px-4 h-screen  flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0 , filter: "blur(0px)"}}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-5xl mb-6 font-bold bg-gradient-to-r from-red-400 via-pink-400 to-white  bg-clip-text text-transparent">
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
          <div className="w-1/2 relative flex flex-col border border- rounded-2xl  border-white/30 justify-center items-center">
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
    threshold: .5,
  });

  useEffect(() => {
    if (inView && activeIndex !== idx) setActiveIndex(idx);
  }, [inView, idx, activeIndex, setActiveIndex]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[100vh] flex items-center justify-center"
    >
      <motion.img
        src={card.img}
        alt={card.heading}
        initial={{ y: 100, scale:.5,  }}
        animate={{
          scale:1,
          y: activeIndex >= idx ? -idx * 10 : 10,
          
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute right-0 rounded-xl p-4 w-full aspect-square object-contain object-center"
        style={{ zIndex: idx }}
      />
    </div>
  );
}
