import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { messageStore, modelConfig } from "./prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Prompt user for input
export default async function sendPrompt(
  model: keyof typeof modelConfig,
  input: string
) {
  try {
    const completion = await openai.chat.completions.create({
      model: modelConfig[model],
      messages: [
        messageStore.systemMessage,
        ...messageStore.sentMessages.slice(-10),
        { role: "user", content: input },
      ] as ChatCompletionMessageParam[],
      temperature: 0.8,
      max_tokens: 2048,
    });

    // console.log("Completion Response:", JSON.stringify(completion, null, 2));

    const output: string = completion.choices[0]?.message?.content ?? "";
    // console.log("Generated Output:", output);

    console.log("Messages sent to model:", [
      messageStore.systemMessage,
      // { role: "user", content: input },
      ...messageStore.sentMessages.slice(-10),
    ]);
    return output.trim() || "Output Failed";
  } catch (error) {
    console.error("Error in sendPrompt:", error);
    throw error;
  }
}
