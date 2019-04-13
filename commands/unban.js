const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const tokenfile = require("../token.json");

module.exports.run = async (bot, message, args) => {
  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  if(!message.member.hasPermissions("BAN_MEMBERS", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send({embed: {
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

  let bannedMember = await bot.fetchUser(args[0]);
  if(!bannedMember) return message.channel.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`Please supply a user to unban, ${message.author}.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
  }})

  if(!message.guild.me.hasPermissions(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`I don't have permissions to unban members, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }

  }})

  let reason = args.slice(1).join(" ");﻿
  if(!reason) reason = "No reason given"

  try {
    message.guild.unban(bannedMember, {reason: reason})
    message.channel.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`User \`${bannedMember.tag}\` has been successfully unbanned, ${message.author}.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
    }})

    bannedMember.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`You have been unbanned from the ${message.guild.name} Discord by ${message.author} for reason \`${reason}\`.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
    }})
  } catch(e) {
    console.log(e.message)
  }
}

module.exports.config = {
  name: "unban",
  aliases: [],
}
