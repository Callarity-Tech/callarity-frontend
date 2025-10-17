import { motion } from "framer-motion";

const title = "Callarity AI";

function HeroSection() {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] z-0"></div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 w-full h-full -z-0 overflow-hidden">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      {/* Bottom Blob */}

      {/* <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[250px] bg-gradient-to-t from-white/60 via-purple-600/30 to-transparent 
        rounded-t-full blur-3xl z-0"
      ></div> */}

      
      <motion.div
      initial={{ opacity: 0, y: 20 , scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute bottom-0 left-0 w-full h-40 blur-[200px]  bg-gradient-to-b from-transparent to-[#f8f8f8] pointer-events-none"></motion.div>
      <motion.div
        initial={{ opacity: 0,y: 40 , scale: 0.4 }}
      animate={{ opacity: 1 , y: 0, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute bottom-0 left-0 w-full h-16 blur-[100px]  bg-gradient-to-b from-transparent to-[#d268ff] pointer-events-none"></motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-4xl z-10"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white flex justify-center flex-wrap gap-1"
          initial="hidden"
          animate="visible"
        >
          {[...title].map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              custom={i}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-300 font-medium"
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Smarter Conversations. At Scale.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Automate outbound calls that sound human. Callarity AI connects,
          understands, and scales your customer communication with real voice
          intelligence.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-3xl hover:bg-gray-200 transition-colors duration-200">
            Get Early Access
          </button>
          <button className="px-8 py-3 bg-white/20 text-white font-semibold rounded-3xl border border-gray-700 hover:border-gray-600 transition-colors duration-200">
            Learn more
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
