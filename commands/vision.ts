import { message } from "telegraf/filters";
import { bot } from "../functions/botInit";
import viewImage from "../functions/groqVision";

bot.on(message("photo"), async (ctx) => {
  try {
    const { caption } = ctx.message;
    const photo = ctx.message.photo?.pop();

    if (!photo) {
      return;
    }

    const file = await ctx.telegram.getFile(photo.file_id);

    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;

    if (!ctx.session) {
      ctx.session = {};
    }

    const input: Message = {
      role: "user",
      content: [
        {
          type: "text",
          text: caption || "Describe this",
        },
        {
          type: "image_url",
          image_url: {
            url: fileUrl,
          },
        },
      ],
    };

    // messageStore.sentMessages.push(input);

    let aiResponse: string;
    try {
      aiResponse = await viewImage("vision", input);
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

    console.log("this ran");
  } catch (error) {
    console.error("Error fetching photo file URL:", error);
    await ctx.reply("Failed to process the photo.");
  }
});
