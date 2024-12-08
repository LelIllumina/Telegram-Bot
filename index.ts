// Start the bot
bot.launch();
console.log("\x1b[34m%s\x1b[0m", "Bot started!");

// Import commands after launching the bot
import "./commands/textGen";
import { bot } from "./functions/botInit";

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
