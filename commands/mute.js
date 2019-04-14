const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");

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

  let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mutee) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Please supply a user to be muted, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})
  let mutetime = args[1];
  if (!mutetime) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Please supply a time, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  let reason = args.join(" ").slice(24 + mutetime.length);﻿
  if(!reason) reason = "No reason given"

  let muterole = message.guild.roles.find(r => r.name === "muted")
  if(!muterole) {
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#818386",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        })
      })
    } catch(e) {
      console.log(e.stack);
    }
  }

  mutee.addRole(muterole.id).then(() => {
    mutee.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`You have been muted by ${message.author.id} for \`${ms(mutetime)}\` with reason \`${reason}\``,
        },
        {
          name: "󠇰󠇰󠇰󠇰",
          value:"**Do not attempt to bypass mutes. You will be banned if you attempt to do so.**",
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
          value:`Successfully  muted user ${mutee.user} for \`${ms(mutetime)}\` with reason \`${reason}\`, ${message.author}.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
    }})
  })

  setTimeout(function(){
    mutee.removeRole(muterole.id);
    mutee.send({embed: {
      color: 0x00ff2a,
      fields:[
        {
          name: emoji("566124597376974848") + `  Mr. Green Bot`,
          value:`You have been unmuted automatically by the bot.`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: message.id
      }
    }})
  }, ms(mutetime));
}

module.exports.config = {
  name: "mute",
  aliases: ["m"],
}
