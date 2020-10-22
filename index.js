const Discord = require("discord.js");
const client = new Discord.Client();
const owner = process.env.BotMaster;
const prefix = ">>";

const fs = require("fs");
client.commands = new Discord.Collection();

const cmdir = './commands';
client.commands = new Discord.Collection();

// commands init
const commandFiles = fs.readdirSync(cmdir).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`${cmdir}/${file}`);


  client.commands.set(command.name, command);
  console.log(`Loading: ${file} as ${command.name}`)

  command.aliases.map(e=>{
    // console.log(e);
    client.commands.set(e, command);
    console.log(`Loading: ${file} as ${e}`)
  })
}

client.on("message", message=>{
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if(message.author.id !== owner) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const comid = client.commands.get(commandName);
  comid.execute(client, message, args);
})


client.on("ready", ()=>{
  console.log(client.user.tag+" is Ready!")
});


client.login(process.env.Token);