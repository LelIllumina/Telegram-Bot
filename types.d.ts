import type { Context } from "telegraf";

declare module "bun" {
  interface Env {
    TELEGRAM_BOT_TOKEN: string;
    GROQ_API_KEY: string;
    IMAGINE_API_KEY: string;
  }
}

// Extend the Context type
export interface BotContext extends Context {
  session: BotSession;
}

// Message type
export interface Message {
  role: string;
  content:
    | string
    | { type: string; text?: string; image_url?: { url: string } }[];
}

export interface MessageStore {
  systemMessage: Message;
  sentMessages: Message[];
}
