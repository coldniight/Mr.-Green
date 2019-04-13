const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const tokenfile = require("../token.json");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  if(!message.member.hasPermissions("MANAGE_MESSAGES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`You don't have enough permissions to run this command, ${message.author}. Permissions needed: \`MANAGE_MESSAGES\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  if(!args[0]) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Please specify an amount of messages to delete, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})
  
  message.delete()
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`Successfully deleted \`${args[0]}\` messages, ${message.author}.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
    }}).then(msg => msg.delete(5000));
  })
}

module.exports.config = {
  name: "purge",
  aliases: ["clear"],
}
