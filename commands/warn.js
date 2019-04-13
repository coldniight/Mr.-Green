const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const tokenfile = require("../token.json");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  function emoji (id) {
    return bot.emojis.get(id).toString();
  }

  if(!message.member.hasPermissions("MANAGE_ROLES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send({embed: {
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
  let reason = args.slice(1).join(" ");﻿
  if(!reason) reason = "No reason given"

  let wUser = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
  if(!wUser) return message.channel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`Please supply a user to warn, ${message.author}.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };


  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  wUser.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`You have been warned on the ${message.guild.name} Discord by ${message.author} for reason \`${reason}\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  message.author.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`You warned the user ${wUser.id} on the ${message.guild.name} Discord for reason \`${reason}\`. Number of warns: \`${warns[wUser.id].warns}\`.`,
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
        value:`User ${wUser.user} has been successfully warned for reason \`${reason}\`, ${message.author}. Number of warns: \`${warns[wUser.id].warns}\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

  let warnschannel = message.guild.channels.find(`name`, "》warnings");
  if(!warnschannel) return console.log("Warnings channel not found.");

  warnschannel.send({embed: {
    color: 0x00ff2a,
    fields:[
      {
        name: emoji("566124597376974848") + `  Mr. Green Bot`,
        value:`${message.author} warned ${wUser.user} for reason \`${reason}\` at the channel ${message.channel}. Number of warnings: \`${warns[wUser.id].warns}\`.`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: message.id
    }
  }})

}

module.exports.config = {
  name: "warn",
  aliases: [],
}
