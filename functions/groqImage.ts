import { unlinkSync, writeFileSync } from "node:fs";
import * as path from "node:path";
import type { Context } from "telegraf";

export default async function genImage(input: string, ctx: Context) {
  const url = "https://api.vyro.ai/v1/imagine/api/generations";

  const headers = {
    Authorization: `Bearer ${process.env.IMAGINE_API_KEY}`,
  };

  const formdata = new FormData();
  formdata.append("prompt", input);
  formdata.append("style_id", "26");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formdata,
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${await response.text()}`
      );
    }

    // Fetch binary data as a Buffer
    const buffer = Buffer.from(await response.arrayBuffer());

    // Save the image temporarily
    const tempPath = path.join(__dirname, "temp.jpg");
    writeFileSync(tempPath, buffer);

    // Send the image to the user
    await ctx.replyWithPhoto({ source: tempPath });

    // Clean up temporary file
    unlinkSync(tempPath);
  } catch (error) {
    console.error("Error generating image:", error);
    await ctx.reply("Failed to generate the image. Please try again later.");
  }
}
