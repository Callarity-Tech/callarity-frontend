import { useState } from "react";
import paperTex from "../assets/paper-texture.webp";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name.trim()) {
      setError("Name is required");
    } else if (!email.includes("@")) {
      setError("Enter a valid email address");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
    } else if (password !== confirm) {
      setError("Passwords do not match");
    } else {
      console.log("Registered Successfully:", { name, email });
      // TODO: replace this with real register logic
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#000] text-white px-4 pt-20">
      <img src={paperTex} className="w-full h-full absolute opacity-20 top-0 left-0" alt="" />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full z-10 max-w-sm bg-[#5757574b] shadow-2xl shadow-red-400/20 border border-white/10 rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create your <span className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">Callarity</span> account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 bg-[#3e3e3e] border border-white/10 rounded-lg focus:outline-none focus:border-red-500 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 bg-[#3e3e3e] border border-white/10 rounded-lg focus:outline-none focus:border-red-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 bg-[#3e3e3e] border border-white/10 rounded-lg focus:outline-none focus:border-red-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 bg-[#3e3e3e] border border-white/10 rounded-lg focus:outline-none focus:border-red-500 transition"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-800 rounded-lg font-medium transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="#" className="text-red-200 hover:underline">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}
