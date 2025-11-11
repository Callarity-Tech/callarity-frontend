import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { text } = req.body;
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: `You are a friendly voice assistant. Respond naturally.
User: ${text}
Assistant: `,
      stream: false
    })
  });

  const data = await response.json();
  const reply = data.response;

  res.json({ reply });
});

app.listen(3000, () => console.log("✅ API running on http://localhost:3000"));
