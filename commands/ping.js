const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const tokenfile = require("../token.json");

module.exports.run = async (bot, message, args) => {

  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:"Pong!",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})
}

module.exports.config = {
  name: "ping",
  aliases: ["test"]
}
