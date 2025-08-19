import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fetch from "node-fetch";

const server = new McpServer(
  { name: "personal-ai-chatbot", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 2) Register a tool: askQuestion
server.registerTool(
  "askQuestion",
  {
    title: "ask question",
    description: "Ask a question to the personal knowledge chatbot which returns an answer.",
    inputSchema: { question: z.string() },
  },
  async ({ question }) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const resp = await fetch("http://localhost:8181/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: controller.signal
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(`Upstream /ask failed: ${resp.status} ${text}`);
      }

      const data = await resp.json();
      return {
        content: [
          { type: "text", text: data.answer ?? "(no answer returned)" }
        ]
      };
    } finally {
      clearTimeout(timeout);
    }
  }
);

// 3) Start stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
