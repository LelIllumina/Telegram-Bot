import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const token = process.env["TELEGRAM_BOT_TOKEN"];
if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not defined");
}
const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears(/hi|hello|hey/i, (ctx) => ctx.reply("Hey there"));

bot.launch();
console.log("\x1b[34m%s\x1b[0m", "Bot started!");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
