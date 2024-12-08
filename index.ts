import { type Context, Telegraf, session } from "telegraf";
import sendPrompt from "./groq";

declare module "bun" {
  interface Env {
    TELEGRAM_BOT_TOKEN: string;
  }
}
// Initial session data structure
interface BotSession {
  pastResponses?: string[];
  counter?: number; // Example of a counter
}

// Extend the Context type
interface BotContext extends Context {
  session: BotSession;
}

// Get the bot token from environment variables
const token = process.env["TELEGRAM_BOT_TOKEN"];
const bot = new Telegraf<BotContext>(token);

// Add session middleware
bot.use(session());

// Log incoming updates for debugging
bot.on("text", async (ctx) => {
  console.log("Received message:", ctx.message.text);

  console.log("Session before initialization:", ctx.session);

  if (!ctx.session) {
    ctx.session = {};
  }

  ctx.session.counter = ctx.session.counter || 0;

  // Process the user message and get AI response
  const aiResponse = await sendPrompt(ctx.message.text);

  ctx.session.counter++;

  ctx.reply(aiResponse);

  console.log("Session after update:", ctx.session);
});

// Start the bot
bot.launch();
console.log("\x1b[34m%s\x1b[0m", "Bot started!");

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
