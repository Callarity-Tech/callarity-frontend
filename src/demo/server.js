import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userText = req.body.text; // ✅ correct way to read input

  const prompt = `
You are an information extractor.
Do NOT reply conversationally.
Do NOT ask questions.

Your job is ONLY to extract the following from the user message:
- name (person name)
- product_id (order or product code)
- issue (problem description)

Return JSON only.
If a field is not found, return null for that field.

Schema:
{
  "name": string | null,
  "product_id": string | null,
  "issue": string | null
}

User: "${userText}"
`;

  const llmRes = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: false,
    }),
  });

  const llmData = await llmRes.json(); // ✅ get LLM output text

  // ✅ Safe JSON parsing (no crashes)
  let extracted;
  try {
    extracted = JSON.parse(llmData.response);
  } catch (e) {
    // Attempt to extract JSON substring if model adds noise
    const match = llmData.response.match(/\{[\s\S]*\}/);
    if (match) {
      extracted = JSON.parse(match[0]);
    } else {
      extracted = { name: null, product_id: null, issue: null };
    }
  }

  // ✅ Always return structured JSON
  res.json(extracted);
});

app.post("/api/murf-tts", async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Missing text input" });
  }

  console.log("📤 Sending text to Murf:", text);

  try {
    const murfRes = await fetch("https://api.murf.ai/v1/speech/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MURF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        voice_id: "bn-IN-arnab",   // or try "en-US-jessica" for more natural tone
        style: "conversational",   // try also "neutral" or "customer_support"
        emotion: "empathetic",     // optional emotional tone
        speed: 1.0,
        pitch: 1.0
      })
    });

    console.log("📡 Murf status:", murfRes.status, murfRes.statusText);

    // Read as text first (so we can inspect format)
    const murfText = await murfRes.text();
    console.log("📥 Murf raw response:", murfText.slice(0, 500)); // log first 500 chars

    // Try to parse JSON
    let murfData;
    try {
      murfData = JSON.parse(murfText);
    } catch {
      murfData = null;
    }

    // ✅ CASE 1: Murf returned a JSON with audio URL
    if (murfData && murfData.audio && murfData.audio.url) {
      console.log("✅ Got audio URL:", murfData.audio.url);
      return res.json({ audioUrl: murfData.audio.url });
    }

    // ✅ CASE 2: Murf returned binary audio directly (fallback)
    if (murfRes.headers.get("content-type")?.includes("audio")) {
      console.log("✅ Received raw audio stream from Murf");
      res.setHeader("Content-Type", murfRes.headers.get("content-type"));
      return res.send(Buffer.from(murfText, "binary"));
    }

    // ❌ CASE 3: Unexpected response format
    console.error("⚠️ Unexpected Murf response format");
    return res.status(500).json({
      error: "Unexpected Murf API response",
      raw: murfText.slice(0, 300)
    });

  } catch (err) {
    console.error("❌ Murf TTS Error:", err);
    return res.status(500).json({ error: "TTS generation failed", message: err.message });
  }
});


app.listen(3000, () => console.log("✅ API running → http://localhost:3000"));
