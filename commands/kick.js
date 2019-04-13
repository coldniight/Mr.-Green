const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const tokenfile = require("../token.json");

module.exports.run = async (bot, message, args) => {
  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  if(!message.member.hasPermissions("KICK_MEMBERS", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`You don't have enough permissions to run this command! Permissions needed: \`KICK_MEMBERS\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!kickMember) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Please supply a user to kick, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
}})

  let reason = args.slice(1).join(" ");﻿
  if(!reason) reason = "No reason given"

  if(!message.guild.me.hasPermissions(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`I don't have permissions to kick members, ${message.author}`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

    kickMember.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`You have been kicked from the ${message.guild.name} Discord by ${message.author} for reason \`${reason}\`.`,
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
          value:`User ${kickMember.user} has been successfully kicked, ${message.author}.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
    }}).then(() =>

    kickMember.kick()).catch(err => console.log(err))
}

module.exports.config = {
  name: "kick",
  aliases: ["k"],
}
