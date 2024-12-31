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
    AI Bot for The Architect
    Version: 1.0.0
    Powered by Geolt
    `);
});
