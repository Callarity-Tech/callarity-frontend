import { motion } from "framer-motion";

const PromoSection = () => {
  const checkIcon = (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-red-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <section className="py-12 px-6 md:px-12 bg-black text-white">
      {/* Header */}
      <div className="text-center max-w-5xl mx-auto mb-24 px-4">
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

      {/* Row 1 */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-5xl mx-auto mb-24">
        <motion.div
          className="flex-1 min-w-[45%]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-3xl font-semibold mb-6 text-white">
            How our <span className="bg-gradient-to-r from-red-200  to-red-300 bg-clip-text text-transparent">Call Flow Works</span>
          </h4>
          <ul className="space-y-4 list-none text-gray-400">
            <li className="flex items-start text-lg font-medium leading-relaxed">
              {checkIcon} Callarity AI instantly converts customer speech into text, maintaining accuracy even in regional and code-mixed languages.
            </li>
            <li className="flex items-start text-lg font-medium leading-relaxed">
              {checkIcon} It understands intent, emotion, and context — deciding how to respond just like a real conversation.
            </li>
            <li className="flex items-start text-lg font-medium leading-relaxed">
              {checkIcon} Our natural multilingual voices speak back within milliseconds, ensuring the flow feels human and uninterrupted.
            </li>
            <li className="flex items-start text-lg font-medium leading-relaxed">
              {checkIcon} Every interaction can trigger follow-ups in CRMs, WhatsApp, or Google Sheets — syncing leads, responses, and updates automatically.
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="flex-1 min-w-[45%] h-[380px] rounded-2xl border border-gray-800 bg-gray-900 shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src=""
            alt="Callarity Flow"
            className="w-full h-full object-contain rounded-2xl transition-transform duration-700 hover:scale-105 hover:rotate-[1deg] hover:brightness-110 hover:contrast-[1.05]"
          />
        </motion.div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 max-w-5xl mx-auto mb-24">
        <motion.div
          className="flex-1 min-w-[45%] h-[380px] rounded-2xl border border-gray-800 bg-gray-900 shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src=""
            alt="Callarity Integration Flow"
            className="w-full h-full object-contain rounded-2xl transition-transform duration-700 hover:scale-105 hover:rotate-[1deg] hover:brightness-110 hover:contrast-[1.05]"
          />
        </motion.div>

        <motion.div
          className="flex-1 min-w-[45%]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-3xl font-semibold mb-6 text-white">
            Why this Technology Flow{" "}
            <span className="bg-gradient-to-r from-red-200  to-red-300 bg-clip-text text-transparent">Matters for Your Business</span>
          </h4>
          <ul className="space-y-4 list-none text-gray-400">
            <li className="flex items-start text-lg font-medium leading-relaxed">
              {checkIcon} Human-like voices = higher engagement.
            </li>
            <li className="flex items-start text-lg font-medium leading-relaxed">
              {checkIcon} 24×7 follow-ups, zero manual effort.
            </li>
            <li className="flex items-start text-lg font-medium leading-relaxed">
              {checkIcon} Talk to every customer, every language.
            </li>
            <li className="flex items-start text-lg font-medium leading-relaxed">
              {checkIcon} Know what works — through smart analytics.
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
