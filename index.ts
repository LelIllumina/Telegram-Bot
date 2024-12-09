import { bot } from "./functions/botInit";
import "./commands/imageGen";
import "./commands/misc";
import "./commands/textGen";
import "./commands/vision";

// Start the bot
bot
  .launch(() => console.log("\x1b[34m%s\x1b[0m", "Bot started!"))
  .catch((error) => {
    console.error(
      "\x1b[41mFailed to start the bot:\x1b[0m\n",
      error,
      "\n\x1b[41mError:\x1b[0m \x1b[31mDid you forget to use a VPN?\x1b[0m"
    );
  });

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
