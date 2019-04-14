const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
let prefixes = JSON.parse(fs.readFileSync("./botconfig.json", "utf8"));

module.exports.run = async (bot, message, args, prefix) => {
  function emoji (id) {
    return bot.emojis.get(id).toString();
  }
      message.channel.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`The prefix is \`${botconfig.prefix}\`, ${message.author}.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
    }})
}

module.exports.config = {
  name: "prefix",
  aliases: [],
}
