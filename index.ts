import { Telegraf } from "telegraf";
import sendPrompt from "./groq";

declare module "bun" {
  interface Env {
    TELEGRAM_BOT_TOKEN: string;
  }
}

const token = process.env["TELEGRAM_BOT_TOKEN"];

const bot = new Telegraf(token);

// Run sendPrompt to get AI response
bot.on("text", async (ctx) => {
  const userMessage = ctx.message.text;
  const aiResponse = await sendPrompt(userMessage);
  ctx.reply(aiResponse);
});

bot.launch();
console.log("\x1b[34m%s\x1b[0m", "Bot started!");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
