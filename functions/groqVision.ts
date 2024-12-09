import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import type { Message } from "../types";
import { messageStore, modelConfig } from "./prompt";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export default async function viewImage(
  model: keyof typeof modelConfig,
  input: Message
) {
  try {
    const completion = await openai.chat.completions.create({
      model: modelConfig[model],
      messages: [
        ...messageStore.sentMessages,
        input,
      ] as ChatCompletionMessageParam[],
      temperature: 0.8,
      max_tokens: 2048,
    });

    const output: string = completion.choices[0]?.message?.content ?? "";

    console.log("Messages sent to model:", [
      messageStore.systemMessage,
      ...messageStore.sentMessages,
    ]);
    return output.trim() || "Output Failed";
  } catch (error) {
    console.error("Error in sendPrompt:", error);
    throw error;
  }
}
