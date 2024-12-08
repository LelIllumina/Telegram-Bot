import { bot } from "../functions/botInit";
import genImage from "../functions/groqImage";

bot.command("imagine", async (ctx) => {
  const prompt = ctx.message.text.split(" ").slice(1).join(" ");
  if (!prompt) {
    return ctx.reply("Please provide a prompt. Usage: /imagine [prompt]");
  }
  await genImage(prompt, ctx);
});
