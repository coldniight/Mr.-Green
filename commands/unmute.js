const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  if(!message.member.hasPermissions("MANAGE_ROLES") || !message.guild.owner) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`You don't have enough permissions to run this command, ${message.author}. Permissions needed: \`MANAGE_ROLES\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

if(!message.guild.me.hasPermissions(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send({embed: {
  color: 0x00ff2a,
  fields:[
    {
      name: emoji("566124597376974848") + `  Mr. Green Bot`,
      value:`I don't have permissions to add roles, ${message.author}.`,
    },
  ],
  timestamp: new Date(),
  footer: {
    text: message.id
  }

}})

let muterole = message.guild.roles.find(r => r.name === "muted")
if(!muterole) return message.channel.send({embed: {
  color: 0x00ff2a,
  fields:[
    {
      name: emoji("566124597376974848") + `  Mr. Green Bot`,
      value:`The muted role doesn't exist, ${message.author}.`,
    },
  ],
  timestamp: new Date(),
  footer: {
    text: message.id
  }
}})

let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send({embed: {
  color: 0x00ff2a,
  fields:[
    {
      name: emoji("566124597376974848") + `  Mr. Green Bot`,
      value:`Please supply a user to be unmuted, ${message.author}.`,
    },
  ],
  timestamp: new Date(),
  footer: {
    text: message.id
  }
}})

let reason = args.slice(1).join(" ");﻿
if(!reason) reason = "No reason given"

mutee.removeRole(muterole.id).then(() => {
  mutee.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`You have been unmuted manually by ${message.author.id}.`,
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
        value:`User ${mutee.user} has been successfully unmuted, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})
})
}


module.exports.config = {
  name: "unmute",
  aliases: ["unm"],
}
