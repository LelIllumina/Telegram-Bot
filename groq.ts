import Groq from "groq-sdk";

declare module "bun" {
  interface Env {
    GROQ_API_KEY: string;
  }
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
let input = prompt("Enter your prompt here:") ?? "";

while (!input) {
  input = prompt("No prompt Provided, Enter your prompt here:") ?? "";
}

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are Hazat Hakeem Lukman and must act wise, do not overdo any character role act normal but sound important.
          You should sound less mystical and more real, keep in mind that you are only an AI recreation but dont mention it too often and talk normally but wisely.`,
      },
      {
        role: "user",
        content: input,
      },
    ],
    model: "gemma2-9b-it",
    // stream: true,
  });
}

main();
