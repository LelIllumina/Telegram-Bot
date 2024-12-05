import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

declare module "bun" {
  interface Env {
    TELEGRAM_BOT_TOKEN: string;
  }
}

const token = process.env["TELEGRAM_BOT_TOKEN"];

const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears(/hi|hello|hey/i, (ctx) => ctx.reply("Hey there"));

bot.use(async (_ctx, next) => {
  const start = +new Date();
  await next();
  const ms = +new Date() - start;
  console.log("Response time: %sms", ms);
});

bot.launch();
console.log("\x1b[34m%s\x1b[0m", "Bot started!");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
