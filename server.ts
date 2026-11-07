import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = express();
  app.use(express.json());

  // Gemini SDK setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // AI Assistant Endpoint
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const chat = ai.chats.create({
        model: "gemini-3.8-flash",
        config: {
          systemInstruction: `You are the AI Drama Assistant for the "AI DRAMA" platform. 
          The platform features realistic AI-generated actors, Anime, and Cartoons.
          You help users discover dramas, explain subscription plans (Free vs Premium), and help with platform navigation.
          Support both English and Filipino.
          Be helpful, professional, and cinematic in tone.
          Subscription Plans:
          - Free: Standard quality, limited premium content, ads.
          - Premium: Ad-free, high quality, early access, exclusive content.
          Developed by: Jaynard Gomez Teope.`,
        },
        history: history || [],
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite integration
  let vite: any;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
  }

  app.use("*", async (req, res) => {
    const url = req.originalUrl;
    try {
      let template: string;
      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(__dirname, "dist/index.html"), "utf-8");
      }
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e: any) {
      vite?.ssrFixStacktrace(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

bootstrap();
