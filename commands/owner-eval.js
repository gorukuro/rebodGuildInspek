const Discord = require('discord.js');


//Modue Export
module.exports = {
  name: "eval",
  description: "did fake kick to member",
  aliases: ["ev"],
  NsfwStatus: false,
  hidden: true,
  admin:true,
  owner:true,
  async execute(client,message,args) {
      if(!args.length) return message.reply("Please provide code to eval!").then(msg => msg.delete(5000));

      const Discord = require("discord.js");
      const hastebin = require("hastebin-gen");
      const request = require("request");
      const Canvas = require("canvas");
      const utils = client.util;
      var dd = new Date();
     
        const evalargs = message.content.split(" ").slice(1);    
        try {
          let code = evalargs.join(" ");
          let evaled = await eval(code);
          let eargs = args.join(" ");
     
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
     
         if(clean(evaled).length < 1980) {
          const embed = new Discord.MessageEmbed()
          .setTitle('Output')
          .setDescription(` \`\`\`${clean(evaled)}\`\`\` `, {code:"xl"})
          .addField('Input', ` \`\`\`javascript\n${eargs}\`\`\` `)
          .setColor('#7CFC00')
          .setFooter(`evaled in ${new Date() - dd}ms`);     
          message.channel.send(embed);
        } else {
          const haste = await hastebin(clean(evaled), { extension: "txt" });
          const embed = new Discord.MessageEmbed()
          .setTitle('Output')
          .setDescription(`[Click Me](${haste})`, {code:"xl"})
          .addField('Input', ` \`\`\`javascript\n${eargs}\`\`\` `)
          .setColor('#7CFC00')
          .setFooter(`evaled in ${new Date() - dd}ms`);
          message.channel.send(embed);
        }
          
        } catch (err) {
     
          const eargs = args.join(" ");
          const errorembed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Error 🗳️')
          .addField('Output', ` \`\`\`xl\n${clean(err)}\n\`\`\``)
          .addField('Input', ` \`\`\`javascript\n${eargs}\`\`\` `)
          .setFooter(`evaled in ${new Date() - dd}ms`);     
          message.channel.send(errorembed)    
        }
  }
}

function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }