import type { Context } from "telegraf";

declare module "bun" {
  interface Env {
    TELEGRAM_BOT_TOKEN: string;
    GROQ_API_KEY: string;
  }
}

interface BotSession {
  pastQueries?: string[]; // Array of past prompts from user
  pastResponses?: string[]; // Array of past responses from bot
}
// Extend the Context type
export interface BotContext extends Context {
  session: BotSession;
}
