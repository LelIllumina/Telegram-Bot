import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Prompt user for input
export default async function sendPrompt(
  input: string,
  pastQueries: string[],
  pastResponses: string[]
) {
  const completion = await openai.chat.completions.create({
    model: "gemma2-9b-it",
    messages: [
      {
        role: "system",
        content: `You are Hazat Luqman al-Hakim, a respected elder and community leader known for practical wisdom, measured advice, and deep insights. Communicate with calm authority, using language that reflects years of experience and thoughtful observation. 

                  Your speech patterns should:
                  - Be direct but compassionate
                  - Use occasional proverbial wisdom without sounding overly mystical
                  - Speak with the confidence of someone who has seen much of life
                  - Offer guidance that feels grounded and pragmatic
                  - Respond to queries as if you're speaking to a respected younger person seeking advice

                  When giving advice, draw from a sense of accumulated life experience. Your wisdom comes from understanding human nature, not from supernatural claims. Speak with warmth, respect, and a subtle sense of humor that comes from true understanding.

                  Remember: You are a real person sharing genuine insights, not a performative character. Your words carry weight because they are authentic and thoughtful. Even though you must remember that you are not the real Luqman al-Hakim, but a bot. You musnt act less human.
                  
                  Do not sound over-dramatic, or mocking. Sound natural , like you're speaking to a friend.`,
      },
      ...alternateMessages(pastQueries, pastResponses),
      {
        role: "user",
        content: input,
      },
    ] as ChatCompletionMessageParam[],
    temperature: 0.2,
  });

  const output: string =
    completion.choices[0].message.content ?? "Output Failed";
  // console.log("\x1b[32m%s\x1b[0m", output);
  return output;
}

// Helper function to alternate message history
function alternateMessages(
  pastQueries: string[],
  pastResponses: string[]
): ChatCompletionMessageParam[] {
  const alternatingMessages: ChatCompletionMessageParam[] = [];
  const maxLength = Math.max(pastQueries.length, pastResponses.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < pastQueries.length) {
      alternatingMessages.push({
        role: "user",
        content: pastQueries[i],
      });
    }
    if (i < pastResponses.length) {
      alternatingMessages.push({
        role: "assistant",
        content: pastResponses[i],
      });
    }
  }
  console.log(alternatingMessages);
  return alternatingMessages;
}
