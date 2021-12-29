import express from "express";
import Discord from "discord.js"; //import discord.js
import * as dotenv from "dotenv";

dotenv.config();

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

const PORT = process.env.PORT || 80
const app = express();
app.use(express.json());

const discord = () => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.login(process.env.BOT_TOKEN);
};
discord();

app.get("/", (req, res) => {
  console.log("res", res);

  res.send("HI from arif");
});

app.post("/", async (req, res) => {
  const { email, name, message } = req.body;

  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
  channel.send(
    `${name} send a new message through sellify contact from. \nemail: ${email} \nmessage: ${message} \n------------`
  );

  res.send("this is a post request");
});

app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
