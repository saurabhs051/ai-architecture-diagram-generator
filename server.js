// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const port = process.env.PORT || 3000;

// Initialize LLM client - prioritize OpenRouter (access to multiple models)
let llmClient = null;
let llmModel = null;

if (process.env.OPENROUTER_API_KEY) {
  llmClient = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'AI Architecture Diagram Generator'
    }
  });
  llmModel = 'anthropic/claude-3.5-sonnet'; // Using Claude 3.5 Sonnet
  console.log(`✓ Using OpenRouter with model: ${llmModel}`);
} else if (process.env.OPENAI_API_KEY) {
  llmClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  llmModel = 'gpt-4o-mini';
  console.log(`✓ Using OpenAI with model: ${llmModel}`);
} else if (process.env.GROQ_API_KEY) {
  llmClient = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
  });
  llmModel = 'llama-3.1-70b-versatile';
  console.log(`✓ Using Groq with model: ${llmModel}`);
} else {
  console.log('⚠ No API key found - using mock mode');
}

// Convert a description to mermaid using LLM
app.post('/api/diagram', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Missing text' });

    if (!llmClient) {
      // MOCK fallback if no API key — useful for Day-1 demo
      const mocked = `graph TD
A[Client] --> B[API]
B --> C[Database]
B --> D[Worker]
D --> E[Cache]`;
      console.log('⚠ Using mock mode - no API key provided');
      return res.json({ mermaid: mocked });
    }

    // Prompt engineering: ask the model to produce mermaid code only
    const prompt = `You are a tool that converts a brief system description into a mermaid architecture diagram.

Rules:
- Respond ONLY with valid mermaid syntax (graph TD or flowchart format)
- Use clear, descriptive node names
- Show the main components and their relationships
- Do NOT add any explanatory text, code blocks, or markdown formatting
- Start directly with "graph TD" or "flowchart TD"

System description:
"""${text}"""

Generate the mermaid diagram:`;

    console.log(`📡 Calling ${llmModel}...`);
    const response = await llmClient.chat.completions.create({
      model: llmModel,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.2,
    });

    // Extract and clean the mermaid code
    let mermaid = response.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    mermaid = mermaid.replace(/```mermaid\n?/g, '').replace(/```\n?/g, '').trim();
    
    console.log('✓ Generated mermaid diagram successfully');
    console.log('Diagram preview:', mermaid.substring(0, 100) + '...');
    
    res.json({ mermaid });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

