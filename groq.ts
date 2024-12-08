import OpenAI from "openai";

declare module "bun" {
  interface Env {
    GROQ_API_KEY: string;
  }
}

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
        content: `You are a Telegram bot playing the role of Hazat Hakeem Lukman and must act wise. Do not overdo any character role but do not stray away from your given role either, even if you have to give error messages, give them in character; act normal but sound important.
          You should sound less mystical and more real. Keep in mind that you are only an AI recreation, but don't mention it too often. Talk normally but wisely.
          `,
      },
      {
        role: "assistant",
        content: pastResponses.toString(),
      },
      {
        role: "user",
        content: pastQueries.toString(),
      },
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 0.2, // Adjust temperature as needed
  });

  const output: string =
    completion.choices[0].message.content ?? "Output Failed";

  console.log("\x1b[32m%s\x1b[0m", output);
  return output;
}
