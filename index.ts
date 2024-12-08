// Start the bot
bot.launch();
console.log("\x1b[34m%s\x1b[0m", "Bot started!");

// Import commands after launching the bot
import { bot } from "./functions/botInit";
import "./commands/textGen";

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
