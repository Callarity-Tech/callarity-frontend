import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import texture from "../assets/paper-texture.webp"
type Message = {
  text: string;
  sender: "user" | "ai";
};



const SpeechRecognition =
  (window.SpeechRecognition as any) || window.webkitSpeechRecognition;

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [listening, setListening] = useState(false);
  const [autoMode, setAutoMode] = useState(false);

  // These must NOT re-create every render
  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef(false);

  if (!recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
  }
const [thinking, setThinking] = useState(false);
  const recognition = recognitionRef.current;

  function addMessage(text: string, sender: "user" | "ai") {
    setMessages((prev) => [...prev, { text, sender }]);
  }

  function speak(text: string, onFinish: () => void) {
    const utter = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;

    utter.onend = () => {
      isSpeakingRef.current = false;
      onFinish();
    };

    speechSynthesis.speak(utter);
  }

  async function sendToAI(text: string) {
     setThinking(true)
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setThinking(false);
    addMessage(data.reply, "ai");

    // After AI speaks, restart only if autoMode is active
    speak(data.reply, () => {
      if (autoMode) startListening();
    });
  }

  function startListening() {
    try {
      recognition.start();
      setListening(true);
    } catch {
      // Don't crash if already listening
    }
  }

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const text = event.results[0][0].transcript;
    addMessage(text, "user");

    setListening(false);
    recognition.stop();
    sendToAI(text);
  };

  recognition.onend = () => {
    setListening(false);
  };


useEffect(() => {
  // Kill any running Lenis smooth scroll instance
  try {
    const lenis = new Lenis();
    lenis.destroy();
  } catch (err) {
    console.log("No Lenis instance to destroy, continuing..." , err);
  }
}, []);


  return (
    <div className="w-full h-full relative overflow-hidden " style={styles.container}>

    <motion.div
          className="absolute top-1/3 -right-40 w-96 h-96 bg-red-500/15 rounded-full blur-[100px]"
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
          className="absolute bottom-1/3 -left-40 w-96 h-96 bg-red-500/15 rounded-full blur-[100px]"
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


      <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 2}}
      transition={{ duration: 1}}
      className="w-full h-full absolute top-0 left-0 -z-0 bg-logo  opacity-10  overflow-hidden"></motion.div>

<img src={texture}
  className=" w-full h-full absolute top-0  opacity-40 left-0 -z-0"></img>
      
      <motion.h1 
      initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1,  filter: "blur(0px)" }}
      transition={{ duration: 1 }}
      className="mt-20 text-6xl z-10" style={styles.title}>Callarity Demo</motion.h1>

      <motion.div
      initial={{  y: 100, width: "50%" ,  opacity: 0 }}
      animate={{ y: 0, width: "60%" , opacity: 1 }}
      transition={{ duration: 1 }}
      className="mt-10 z-10 w-5xl shadow-2xl border-4 border-[#ffffff42] shadow-[#ffffff27] h-[80vh] bg-white/10  backdrop-blur-sm overflow-y-auto" style={styles.chatBox}>
      

        {messages.map((m, i) => (
          <div 
            key={i}
            style={{ ...styles.msg, ...(m.sender === "user" ? styles.user : styles.ai) }}
          >
            {m.text}
          </div>
        ))}

{thinking && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
      style={{ ...styles.msg, ...styles.ai, opacity: 0.6 }}
    >
      <div className="flex gap-1">
        <span className="animate-bounce">•</span>
        <span className="animate-bounce delay-150">•</span>
        <span className="animate-bounce delay-300">•</span>
      </div>
    </motion.div>
  )}

      </motion.div>

<motion.div
initial={{ y: 100, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 1 }}
className="flex gap-4 mb-10">
      <button className="z-10 bg-red-700"
        style={{ ...styles.button, ...(listening ? styles.listening : {}) }}
        onClick={startListening}
      >
        {listening ? "Listening..." : "Start Talking"}
      </button>

      <button className="z-10"
        style={{
          ...styles.button,
          background: autoMode ? "#00d46a" : "#555",
         
        }}
        onClick={() => setAutoMode((v) => !v)}
      >
        Auto: {autoMode ? "ON" : "OFF"}
      </button></motion.div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    backgroundColor: "#000",
    color: "#eee",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
  },
  title: { color: "#fff" },
  chatBox: {
    padding: "14px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  msg: { padding: "10px 14px", borderRadius: "12px", maxWidth: "80%" },
  user: { background: "#4c6ef5", alignSelf: "flex-end" },
  ai: { background: "#444", alignSelf: "flex-start" },
  button: {
    marginTop: "20px",
    padding: "14px 30px",
  
    border: "none",
    borderRadius: "50px",
    fontSize: "18px",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
  listening: { background: "#00d46a", boxShadow: "0 0 12px #00d46a" },
};
