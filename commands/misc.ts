import { bot } from "../functions/botInit";

// Basic slash commands
bot.command("help", (ctx) => {
  ctx.reply(`
    Available commands:
    "text"  - AI Response
    /help   - Show this help message
    /info   - Get bot information
`);
});
bot.command("info", (ctx) => {
  ctx.reply(`
    Bot Information:
    AI Persona of Luqman Al-Hakim
    Version: 1.0.0
    Created by: Bilal Ahmed
    Powered by Telegraf and GroqCloud AI
    `);
});
