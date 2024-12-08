import { type Context, Telegraf, session } from "telegraf";
import sendPrompt from "./groq";

declare module "bun" {
  interface Env {
    TELEGRAM_BOT_TOKEN: string;
  }
}

// Initial session data structure
interface BotSession {
  pastQueries?: string[]; // Array of past prompts from user
  pastResponses?: string[]; // Array of past responses from bot
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
  // console.log("Received message:", ctx.message.text);

  // Initialize session if not already initialized
  if (!ctx.session) {
    ctx.session = {};
  }

  // Ensure pastQueries and pastResponses are arrays
  if (!ctx.session.pastQueries) {
    ctx.session.pastQueries = [];
  }
  if (!ctx.session.pastResponses) {
    ctx.session.pastResponses = [];
  }

  // Push new query to the pastQueries array
  ctx.session.pastQueries.push(ctx.message.text);

  // Process the user message and get AI response
  const aiResponse = await sendPrompt(
    ctx.message.text,
    ctx.session.pastQueries,
    ctx.session.pastResponses
  );

  // Send AI response to user
  ctx.reply(aiResponse);

  // Push new AI response to pastResponses
  ctx.session.pastResponses.push(aiResponse);

  // Log session data for debugging
  // console.log(ctx.session.pastQueries, ctx.session.pastResponses);
});

// Start the bot
bot.launch();
console.log("\x1b[34m%s\x1b[0m", "Bot started!");

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
