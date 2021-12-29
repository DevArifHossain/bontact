import express from "express";
import Discord from "discord.js"; //import discord.js
import * as dotenv from "dotenv";
import dayjs from 'dayjs'

dotenv.config();

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

const PORT = process.env.PORT || 80;
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
  res.json({
    msg: "Welcome to Bontact!!",
  });
});

app.post("/", async (req, res) => {
  const { email, name, message, channelId } = req.body;

  if(!(email && name && message && channelId)) {
    res.status(400).json({
      sucess: false,
      msg: "name, email, message and channelId is require!",
    });
  } 

  const channel = await client.channels.fetch(channelId);
  channel.send(
    `📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨 \n**${name}** send a new message through your contact form. \nemail: **${email}** \nmessage: ${message} \ntime: ${dayjs(new Date()).format('h:mm A - DD MMM, YYYY')}`
  );

  res.json({
    sucess: true,
    msg: "message sent to discord!!",
  });
});

app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
