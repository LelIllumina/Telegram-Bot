import { session } from "telegraf";
import { bot } from "../functions/botInit";
import sendPrompt from "../functions/groq";
import "./misc.ts";

// Add session middleware
bot.use(session());
// Log incoming updates for debugging
bot.on("text", async (ctx) => {
  if (ctx.message.text.startsWith("/")) {
    return;
  }
  const prompt = ctx.message.text;

  // console.log("Received message:", prompt);
  if (!ctx.session) {
    ctx.session = {};
  }

  ctx.session.pastQueries ??= [];
  ctx.session.pastResponses ??= [];
  const { pastQueries, pastResponses } = ctx.session;

  // Push new query to the pastQueries array
  pastQueries.push(prompt);

  // Process the user message and get AI response
  const aiResponse = await sendPrompt(prompt, pastQueries, pastResponses);

  // Send AI response to user
  ctx.reply(aiResponse);

  // Push new AI response to pastResponses
  pastResponses.push(aiResponse);

  // Log session data for debugging
  // console.log(ctx.session.pastQueries, ctx.session.pastResponses);
});
