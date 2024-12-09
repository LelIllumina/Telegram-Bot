import { session } from "telegraf";
import { message } from "telegraf/filters";
import { bot } from "../functions/botInit";
import sendPrompt from "../functions/groq";
import { messageStore } from "../functions/prompt";

// Add session middleware
bot.use(session());
// Log incoming updates for debugging
bot.on(message("text"), async (ctx) => {
  if (ctx.message.text.startsWith("/")) {
    return;
  }

  const prompt = ctx.message.text;

  if (!ctx.session) {
    ctx.session = {};
  }

  messageStore.sentMessages.push({ role: "user", content: prompt });

  // Process the user message and get AI response
  let aiResponse: string;
  try {
    aiResponse = await sendPrompt("text", prompt);
  } catch (error) {
    console.error("Error generating AI response:", error);
    return ctx.reply(
      "Sorry, something went wrong while generating a response."
    );
  }

  // Validate AI response
  if (!aiResponse || aiResponse.trim() === "") {
    console.error("AI response is empty or invalid:", aiResponse);
    return ctx.reply(
      "Sorry, I couldn't generate a meaningful response. Please try again."
    );
  }

  // Send the valid AI response
  await ctx.reply(aiResponse);

  // Store the user's message and AI response for future reference
  messageStore.sentMessages.push({ role: "assistant", content: aiResponse });
  console.log(messageStore.sentMessages);
});
