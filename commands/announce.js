const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  if(!message.member.hasPermissions(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`You don't have enough permissions to run this command, ${message.author}. Permissions needed: \`BAN_MEMBERS\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  message.delete()
  let argsresult;
  let mChannel = message.mentions.channels.first()
  if(mChannel) {
    argsresult = args.slice(1).join(" ")
    mChannel.send(argsresult)
  } else {
    argsresult = args.join(" ")
    message.channel.send(argsresult)
  }
}

module.exports.config = {
  name: "announce",
  aliases: ["an"],
}
