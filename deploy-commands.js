require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot send a message to a channel')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel to send the message to')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('Message to send')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Make the bot send a message to a channel')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel to send the message to')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('Message to send')
        .setRequired(true)),      


        
  new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Feel free to vote every 12 hours!'),
 new SlashCommandBuilder()
    .setName('info')
    .setDescription('Checks the rates and general info of the server'),
   new SlashCommandBuilder()
    .setName('help')
    .setDescription('What commands do I have?'),
    new SlashCommandBuilder()
    .setName('premium')
    .setDescription('Info on our Premium Packages!'),

];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands.map(c => c.toJSON()) }
    );
    console.log('✅ Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
})();