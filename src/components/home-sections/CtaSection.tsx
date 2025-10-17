import { motion } from "framer-motion";
import logo from "../../assets/callaritylogo.svg";
function CtaSection() {
  return (
<section className="relative w-full py-24 px-4 border-t border-gray-800 overflow-hidden">
        {/* Background image */}
        <img
          src={logo}
          className="absolute top-0 left-0 w-full h-full select-none pointer-events-none  object-cover z-0 opacity-10"
          alt="background"
        />

        {/* Content */}
        <div className="max-w-3xl mx-auto text-center relative z-10">
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
      </section>
  )
}

export default CtaSection   