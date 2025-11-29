# AI Architecture Diagram Generator

**Turn text descriptions into beautiful architecture diagrams instantly.**

🔗 **[View Landing Page](YOUR_NOTION_PAGE_URL)** | 🚀 **[Try Live Demo](https://saurabhs051.github.io/ai-architecture-diagram-generator)**

---

## What It Does

Describe any system architecture in plain English, and this tool uses AI to generate a clean, professional Mermaid diagram automatically. No drawing tools needed.

**Example Input:**
> "A web service receives HTTP requests from users, validates the input, writes to a PostgreSQL database, publishes a job to a RabbitMQ queue for a worker process to handle, and returns a JSON response to the client."

**Output:** A beautiful, auto-generated architecture diagram showing all components and their relationships.

---

## Demo

![Demo Screenshot](day1-demo.png)

---

## Features

- ✅ **AI-Powered** - Uses Claude 3.5 Sonnet (via OpenRouter), GPT-4, or Groq
- ✅ **Instant Results** - Generate diagrams in seconds
- ✅ **Clean UI** - Simple, modern interface
- ✅ **Mermaid Rendering** - Professional-quality diagrams
- ✅ **Flexible** - Works with OpenRouter, OpenAI, or Groq APIs

---

## Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/saurabhs051/ai-architecture-diagram-generator.git
cd ai-architecture-diagram-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your API key
Create a `.env` file:
```bash
# Option 1: OpenRouter (recommended - access to multiple models)
OPENROUTER_API_KEY=your_key_here

# Option 2: OpenAI
OPENAI_API_KEY=your_key_here

# Option 3: Groq
GROQ_API_KEY=your_key_here
```

### 4. Run the server
```bash
npm start
```

### 5. Open your browser
Visit `http://localhost:3000` and start generating diagrams!

---

## How It Works

1. **User Input** - Describe your system in plain text
2. **AI Processing** - LLM converts description to Mermaid syntax
3. **Rendering** - Mermaid.js renders the final diagram
4. **Display** - Beautiful architecture diagram appears instantly

---

## API Support

This tool works with multiple AI providers:

- **OpenRouter** (recommended) - Access to Claude 3.5 Sonnet, GPT-4, and more
- **OpenAI** - GPT-4o-mini by default
- **Groq** - Fast inference with Llama 3.1 70B

Simply add the appropriate API key to your `.env` file.

---

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML/CSS/JS
- **Diagram Rendering:** Mermaid.js
- **AI:** OpenRouter / OpenAI / Groq

---

## Project Structure

```
ai-architecture-diagram-generator/
├── server.js         # Express backend with AI integration
├── index.html        # Frontend UI
├── package.json      # Dependencies
└── .env             # API keys (not committed)
```

---

## Contributing

Found a bug or want to add a feature? PRs are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - feel free to use this for your own projects!

---

## Acknowledgments

Built as a Day 1 MVP to demonstrate the power of AI + simple web tech.

**Questions?** Open an issue or reach out!

---

## Get Updates

Want to stay updated on new features? [Subscribe to updates](YOUR_CONVERTKIT_LINK)

