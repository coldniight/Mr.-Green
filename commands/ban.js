const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

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

  let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!banMember) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Please supply a user to ban, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
}})

  let reason = args.slice(1).join(" ");﻿
  if(!reason) reason = "No reason given"

if(!message.guild.me.hasPermissions(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({embed: {
  color: 0x00ff2a,
  fields:[
    {
      name: emoji("566124597376974848") + `  Mr. Green Bot`,
      value:`I don't have permissions to ban members, ${message.author}.`,
    },
  ],
  timestamp: new Date(),
  footer: {
    text: message.id
  }

}})

banMember.send({embed: {
  color: 0x00ff2a,
  fields:[
    {
      name: emoji("566124597376974848") + `  Mr. Green Bot`,
      value:`You have been banned from the ${message.guild.name} Discord by ${message.author} for reason \`${reason}\`. DM \`coldnight#8060\` to appeal.`,
    },
    {
      name: "󠇰󠇰󠇰󠇰",
      value:"**Do not attempt to bypass bans, you will just be banned again.**",
    },
  ],
  timestamp: new Date(),
  footer: {
    text: message.id
  }
}})

message.channel.send({embed: {
  color: 0x00ff2a,
  fields:[
    {
      name: emoji("566124597376974848") + `  Mr. Green Bot`,
      value:`User ${banMember.user} has been successfully banned, ${message.author}.`,
    },
  ],
  timestamp: new Date(),
  footer: {
    text: message.id
  }
}}).then(() =>

message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))
}

module.exports.config = {
  name: "ban",
  aliases: [],
}
