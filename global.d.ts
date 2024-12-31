import type { Context } from "telegraf";

declare module "bun" {
  interface Env {
    TELEGRAM_BOT_TOKEN: string;
    GROQ_API_KEY: string;
    IMAGINE_API_KEY: string;
    OPENAI_API_KEY: string;
  }
}

// Extend the Context type
declare global {
  interface BotContext extends Context {
    session: BotSession;
  }

  // Message type
  interface Message {
    role: string;
    content:
      | string
      | { type: string; text?: string; image_url?: { url: string } }[];
  }

  interface MessageStore {
    systemMessage: Message;
    sentMessages: Message[];
  }
}
