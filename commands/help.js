const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  if(!message.member.hasPermissions("MANAGE_ROLES", "ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_MESSAGES") || !message.guild.owner) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Avaible commands for user ` + message.author,
      },
      {
        name: "󠇰󠇰󠇰󠇰",
        value:"**help**, **ping**, **prefix**",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  if(message.member.hasPermissions("ADMINISTRATOR") || !message.guild.owner) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Avaible commands for user ` + message.author,
      },
      {
        name: "󠇰󠇰󠇰󠇰",
        value:"**help**, **ping**, **prefix**, **warn**, **mute**, **unmute**, **purge**, **softban**, **ban**, **kick**, **announce**, **application**",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  if(message.member.hasPermissions("BAN_MEMBERS") || !message.guild.owner) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Avaible commands for user ` + message.author,
      },
      {
        name: "󠇰󠇰󠇰󠇰",
        value:"**help**, **ping**, **prefix**, **warn**, **mute**, **unmute**, **purge**, **softban**, **ban**, **kick**, **announce**",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  if(message.member.hasPermissions("KICK_MEMBERS") || !message.guild.owner) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Avaible commands for user ` + message.author,
      },
      {
        name: "󠇰󠇰󠇰󠇰",
        value:"**help**, **ping**, **prefix**, **warn**, **mute**, **unmute**, **purge**, **kick**",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  if(message.member.hasPermissions("MANAGE_ROLES") || !message.guild.owner) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Avaible commands for user ` + message.author,
      },
      {
        name: "󠇰󠇰󠇰󠇰",
        value:"**help**, **ping**, **prefix**, **warn**, **mute**, **unmute**, **purge**",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})




}

module.exports.config = {
  name: "help",
  aliases: ["commands","h","cmds"]
}
