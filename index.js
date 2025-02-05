import { Client, GatewayIntentBits } from "discord.js";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1].trim();

    if (!url) {
      return message.reply("Please provide a valid URL.");
    }

    const shortId = nanoid(6);
    const shortUrl = `http://localhost:7003/${shortId}`;

    // Store in MongoDB
    await Url.create({ shortId, originalUrl: url });

    return message.reply(`Shortened URL: ${shortUrl}`);
  }

  message.reply("Hi from bot");
});

client.login(process.env.DISCORD_TOKEN);
