import { session } from "telegraf";
import { bot } from "../functions/botInit";
import sendPrompt from "../functions/groq";

// Add session middleware
bot.use(session());
// Log incoming updates for debugging
bot.on("text", async (ctx) => {
  // console.log("Received message:", ctx.message.text);
  if (!ctx.session) {
    ctx.session = {};
  }

  ctx.session.pastQueries ??= [];
  ctx.session.pastResponses ??= [];

  // Push new query to the pastQueries array
  ctx.session.pastQueries.push(ctx.message.text);

  // Process the user message and get AI response
  const aiResponse = await sendPrompt(
    ctx.message.text,
    ctx.session.pastQueries,
    ctx.session.pastResponses
  );

  // Send AI response to user
  ctx.reply(aiResponse);

  // Push new AI response to pastResponses
  ctx.session.pastResponses.push(aiResponse);

  // Log session data for debugging
  // console.log(ctx.session.pastQueries, ctx.session.pastResponses);
});
