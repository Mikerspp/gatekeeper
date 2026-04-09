require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // ✅ Role restriction (by Role ID)
  const allowedRoleId = process.env.ALLOWED_ROLE_ID;

  // interaction.member is a GuildMember in guilds
  const member = interaction.member;


if (interaction.commandName === 'say') {


  // If for any reason we can't read roles, fail closed:
  if (!allowedRoleId || !member?.roles?.cache?.has(allowedRoleId)) {
    return interaction.reply({
      content: '❌ You are not allowed to use this command.',
      ephemeral: true
    });
  }

  const channel = interaction.options.getChannel('channel');
  const message = interaction.options.getString('message');

  if (!channel?.isTextBased()) {
    return interaction.reply({
      content: '❌ That channel cannot receive messages.',
      ephemeral: true
    });
  }

  await channel.send(message);

  return await interaction.reply({
    content: `✅ Message sent to ${channel}`,
    ephemeral: true
  });

}

if (interaction.commandName === 'vote') {
        return await interaction.reply({
      content: `✅ Hello`,
      ephemeral: false // set to true if you want only the user to see it
    });
  }


});

client.login(process.env.DISCORD_TOKEN);