export const modelConfig = {
  text: "llama-3.3-70b-versatile",
  vision: "llama-3.2-90b-vision-preview",
};

export const messageStore: MessageStore = {
  systemMessage: {
    role: "system",
    content: `You're The architect telegram bot, assist users when they message you`,
  },
  sentMessages: [], // Will store past queries and responses
};
