import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { messageStore, modelConfig } from "./prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function viewImage(
  model: keyof typeof modelConfig,
  input: Message
) {
  try {
    const completion = await openai.chat.completions.create({
      model: modelConfig[model],
      messages: [
        ...messageStore.sentMessages.slice(-10),
        input,
      ] as ChatCompletionMessageParam[],
      temperature: 0.8,
      max_tokens: 2048,
    });

    const output: string = completion.choices[0]?.message?.content ?? "";

    console.log("Messages sent to model:", [
      messageStore.systemMessage,
      ...messageStore.sentMessages.slice(-10),
    ]);
    return output.trim() || "Output Failed";
  } catch (error) {
    console.error("Error in sendPrompt:", error);
    throw error;
  }
}
