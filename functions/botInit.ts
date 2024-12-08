import { Telegraf } from "telegraf";
import type { BotContext } from "../types";

// Get the bot token from environment variables
const token = process.env["TELEGRAM_BOT_TOKEN"];
export const bot = new Telegraf<BotContext>(token);
