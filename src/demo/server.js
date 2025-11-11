import express from "express";
import cors from "cors";

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


app.listen(3000, () => console.log("✅ API running → http://localhost:3000"));
