import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import texture from "../assets/paper-texture.webp";
import { Link } from "react-router";

type Message = { text: string; sender: "user" | "ai" };

const SpeechRecognition =
  (window.SpeechRecognition as any) || (window as any).webkitSpeechRecognition;

const BAR_COUNT = 32;
type Step = "idle" | "waiting_name" | "waiting_product" | "waiting_issue" | "done";

export default function App() {
  const [volume, setVolume] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey! I'm here to help with product issues. Just say “I want to file a complaint.”", sender: "ai" },
  ]);
  const [listening, setListening] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [thinking, setThinking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef(false);
  const stepRef = useRef<Step>("idle");
  const ticketRef = useRef<{ name?: string; product_id?: string; issue?: string }>({});
  const hasGreeted = useRef(false);
useEffect(() => {
  speechSynthesis.getVoices();
  setTimeout(() => speechSynthesis.getVoices(), 200);
}, []);

  if (!recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
  }
  const recognition = recognitionRef.current;

  // -------- UI helpers --------
  const addMessage = (text: string, sender: "user" | "ai") =>
    setMessages((prev) => [...prev, { text, sender }]);

  async function humanize(text: string) {
    try {
      setThinking(true);
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          prompt: `Rewrite this to sound natural, warm, and short. Do NOT add emojis.\n"${text}"`,
          stream: false,
        }),
      });
      const data = await res.json();
      setThinking(false);
      return (data.response || text).trim();
    } catch {
      return text;
    }
  }

// async function playAudioFromBlob(blob: Blob, onFinish?: () => void) {
//   const arrayBuffer = await blob.arrayBuffer();
//   const audioCtx = new AudioContext();
//   const buffer = await audioCtx.decodeAudioData(arrayBuffer);

//   const source = audioCtx.createBufferSource();
//   source.buffer = buffer;
//   source.connect(audioCtx.destination);
//   source.onended = onFinish || null;
//   source.start(0);
// }



async function say(text: string, after?: () => void) {
  const natural = await humanize(text);
  addMessage(natural, "ai");

  try {
    const res = await fetch("http://localhost:3000/api/murf-tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: natural })
    });

    const audioBlob = await res.blob();
    const audioURL = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);

    audio.onended = () => {
      after?.();
      if (autoMode) startListening();
    };
    audio.play();

  } catch (err) {
    console.warn("Murf TTS failed – fallback to browser TTS.", err);

    const utter = new SpeechSynthesisUtterance(natural);
    speechSynthesis.speak(utter);
    utter.onend = () => {
      after?.();
      if (autoMode) startListening();
    };
  }
}


  function startListening() {
    try { recognition.start(); setListening(true); } catch {console.log("Recognition already started");}
  }
  function stopListening() { try { recognition.stop(); } catch {console.log("Recognition already stopped");}; setListening(false); }

  // -------- Extractors --------
  const extractName = (t: string) =>
    t.replace(/^(my name is|i am|this is|it's|its)/i, "").trim();

  function extractProductId(raw: string): string | null {
    const cleaned = raw
      .replace(/\b(product|order|id|no|number|is)\b/gi, "")
      .replace(/[^\w-]/g, " ")
      .trim();
    const match = cleaned.match(/\b[A-Z0-9-]{3,}\b/i);
    return match ? match[0].toUpperCase() : null;
  }

  function extractIssue(t: string) {
    const s = t.trim();
    if (/^\w{3,}$/i.test(s)) return null;
    return s.length > 160 ? s.slice(0, 157) + "..." : s;
  }

  function saveComplaint(ticket: any) {
    const prev = JSON.parse(localStorage.getItem("complaints") || "[]");
    prev.push({ ...ticket, date: new Date().toISOString() });
    localStorage.setItem("complaints", JSON.stringify(prev));
  }

  // -------- Conversation Flow / FSM --------
  async function handleTurn(text: string) {
    const lower = text.toLowerCase();

    if (!hasGreeted.current && /\b(hi|hello|hey|namaste)\b/.test(lower)) {
      hasGreeted.current = true;
      return say("Hey! Happy to help. If something went wrong, just say: “I want to file a complaint.”");
    }

    if (stepRef.current === "idle" && /\bcomplain|issue|file\b/i.test(lower)) {
      stepRef.current = "waiting_name";
      ticketRef.current = {};
      return say("Alright, let's get this sorted. May I know your name?");
    }

    if (stepRef.current === "idle") {
      return say("I only help with complaints. Just say: “I want to file a complaint.”");
    }

    // ------ Steps ------
    if (stepRef.current === "waiting_name") {
      const name = extractName(text) || text.trim();
      ticketRef.current.name = name;
      stepRef.current = "waiting_product";
      return say(`Thanks ${name.split(" ")[0]}. Could you share the product or order ID?`);
    }

    if (stepRef.current === "waiting_product") {
      const pid = extractProductId(text);
      if (!pid) return say("I didn't quite catch that. Could you repeat the product ID clearly?");
      ticketRef.current.product_id = pid;
      stepRef.current = "waiting_issue";
      return say("Got it. Now describe the issue in one short line.");
    }

    if (stepRef.current === "waiting_issue") {
      const issue = extractIssue(text);
      if (!issue) return say("Just a short sentence about the problem will do.");
      ticketRef.current.issue = issue;
      saveComplaint(ticketRef.current);
      const first = ticketRef.current.name?.split(" ")[0] || "there";
      stepRef.current = "idle";
      ticketRef.current = {};
      return say(`Thanks ${first}, your complaint is logged. We'll reach out soon.`);
    }
  }

  // -------- Speech Input --------
  recognition.onresult = (e: any) => {
    const text = e.results[0][0].transcript;
    addMessage(text, "user");
    stopListening();
    handleTurn(text);
  };

  recognition.onerror = () => stopListening();
  recognition.onend = () => setListening(false);

  // -------- Mic Volume Wave --------
  useEffect(() => {
    let ctx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let data: Uint8Array, raf: number;

    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      ctx = new AudioContext();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const src = ctx.createMediaStreamSource(stream);
      src.connect(analyser);
      data = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        analyser?.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += ((data[i] - 128) / 128) ** 2;
        setVolume(Math.min(Math.sqrt(sum / data.length) * 4, 1));
        raf = requestAnimationFrame(tick);
      };
      tick();
    })();

    return () => { ctx?.close(); cancelAnimationFrame(raf); };
  }, []);


  // ---------- UI ----------
  return (
    <div className="w-full h-full relative overflow-hidden" style={styles.container}>
      {/* Ambient blobs */}
      <motion.div
        className="absolute top-1/3 -right-40 w-96 h-96 bg-red-500/15 rounded-full blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-1/3 -left-40 w-96 h-96 bg-red-500/15 rounded-full blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
      />

      <motion.div initial={{ scale: 0 }} animate={{ scale: 2 }} transition={{ duration: 1 }}
        className="w-full h-full absolute top-0 left-0 -z-0 bg-logo opacity-10 overflow-hidden" />

      <img src={texture} className="w-full h-full absolute top-0 opacity-40 left-0 -z-0" />

      <motion.h1
        initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1 }}
        className="mt-20 text-6xl z-10"
        style={styles.title}
      >
        Callarity Demo
      </motion.h1>

      <motion.div
        initial={{ y: 100, width: "50%", opacity: 0 }}
        animate={{ y: 0, width: "60%", opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-10 z-10 w-5xl shadow-2xl border-4 relative overflow-x-hidden border-[#ffffff42] shadow-[#ffffff27] h-[80vh] bg-white/10 backdrop-blur-sm overflow-y-auto"
        style={styles.chatBox}
      >
        {/* Siri bars (top, reacts to listening/speaking/volume) */}
        <div className="sticky top-0 z-10 w-full">
          <div className="flex items-center justify-center py-3 pointer-events-none">
            <div className="flex gap-[3px]">
              {Array.from({ length: BAR_COUNT }).map((_, i) => {
                const barHeight = 10 + volume * 90 * Math.sin((i / BAR_COUNT) * Math.PI);
                return (
                  <motion.div
                    key={i}
                    animate={{ height: listening || isSpeakingRef.current ? barHeight : 1 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className="w-[4px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(180deg,#ff4bff,#ff00e6,#ff0066,#ff6600,#ffaa00)",
                      opacity: listening || isSpeakingRef.current ? 0.9 : 0.25,
                      filter: "drop-shadow(0 0 6px rgba(255,0,200,0.8))",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Messages */}
        {messages.map((m, i) => (
          <div key={i} style={{ ...styles.msg, ...(m.sender === "user" ? styles.user : styles.ai) }}>
            {m.text}
          </div>
        ))}

        {/* Thinking dots */}
        {thinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
            style={{ ...styles.msg, ...styles.ai, opacity: 0.6 }}
          >
            <div className="flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce [animation-delay:150ms]">•</span>
              <span className="animate-bounce [animation-delay:300ms]">•</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex gap-4 mb-10"
      >
        <button
          className="z-10 bg-red-700"
          style={{ ...styles.button, ...(listening ? styles.listening : {}) }}
          onClick={startListening}
        >
          {listening ? "Listening..." : "Start Talking"}
        </button>

        <button
          className="z-10"
          style={{ ...styles.button, background: autoMode ? "#00d46a" : "#555" }}
          onClick={() => setAutoMode((v) => !v)}
        >
          Auto: {autoMode ? "ON" : "OFF"}
        </button>

       

        <Link className="z-10" to="/dashboard" style={{ ...styles.button }}>
          Dashboard
        </Link>
      </motion.div>
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
