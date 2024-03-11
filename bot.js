const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAI } = require("openai");

const botToken = "7010172189:AAEiGDN_gIxhdcsHrLO2ev6IDq_5Z4_USYI";
const openaiToken = "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";

// const config = new Configuration({
//   apiKey: openaiToken,
// });

const openai = new OpenAI({
  //key: "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",
  // apiKey: process.env["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"],
  apiKey: "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",
});

const bot = new Telegram(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome To AI ChatBot");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  const reply = await openai.completions.create({
    max_tokens: 100,
    model: "babbage-002",
    prompt: msg.text,
    temperature: 0.5,
  });

  bot.sendMessage(chatId, reply.choices[0].text);
});
