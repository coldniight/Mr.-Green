const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const tokenfile = require("../token.json");

module.exports.run = async (bot, message, args) => {
  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  if(!message.member.hasPermissions(["ADMINISTRATOR"])) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`You don't have enough permissions to run this command, ${message.author}. Permissions needed: \`ADMINISTRATOR\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  let answerMember = await bot.fetchUser(args[0]);
  if(!answerMember) return message.channel.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`Please supply a user to answer, ${message.author}.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
  }})

  let reason = args.slice(1).join(" ");﻿
  if(!reason) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Please supply an answer, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  message.delete()
  answerMember.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot | Staff Application`,
        value:`${message.author} has read your application! His answer is: \`${reason}\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})
}

module.exports.config = {
  name: "application",
  aliases: ["app"],
}
