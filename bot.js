const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAI } = require("openai");

const botToken = "add-your-sectret-token";

// const config = new Configuration({
//   apiKey: openaiToken,
// });

const openai = new OpenAI({
  apiKey: "add-your-sectret-token",
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
