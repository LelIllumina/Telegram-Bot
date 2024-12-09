import { bot } from "../functions/botInit";

// Basic slash commands
bot.command("help", (ctx) => {
  ctx.reply(`
    Available commands:
    [prompt]          - AI Response, supports text and image
    /imagine [prompt] - Generate an image based on the provided prompt
    /help             - Show this help message
    /info             - Get bot information
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
