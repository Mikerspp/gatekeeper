require('dotenv').config();
const { Client, GatewayIntentBits, Partials,ActivityType } = require('discord.js');





const client = new Client({ intents: [
GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
  ]
 });

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  

 client.user.setActivity('Use /vote', {
    type: ActivityType.Watching,
  });


});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // ✅ Role restriction (by Role ID)
  const allowedRoleId = process.env.ALLOWED_ROLE_ID;

  // interaction.member is a GuildMember in guilds
  const member = interaction.member;

if (interaction.commandName === 'rules') {



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

  const rulesmess = `**1. RESPECT AND CIVILITY**• Treat all members with respect• No harassment, bullying, or hate speech• No discrimination of any kind• Keep conversations friendly

**2. LANGUAGE AND COMMUNICATION**• **Primary language: English**• No spamming or excessive caps• No excessive @mentions• Use appropriate channels

**3. CONTENT RESTRICTIONS**• **No NSFW/18+ content**• No malicious links• No advertising other servers• No illegal activities discussion

**4. GAME-RELATED RULES**• No cheats/hacks/exploits discussion• Report bugs to staff• No real-money trading (RMT)• Keep spoilers in appropriate channels

**7. STAFF AND MODERATION**• Follow staff instructions• No public arguing with staff• Appeal via tickets• Staff decisions are final

**8. GENERAL CONDUCT**• No doxxing or personal info• Keep drama private• Use common sense• Help build positive community

**PUNISHMENT:** Warning → Mute → Temp Ban → Permanent Ban **SEVERE VIOLATIONS = IMMEDIATE BAN:** 

By reacting, you agree to follow these rules. Rules may be updated anytime.`;

  await channel.send(rulesmess);

  return await interaction.reply({
    content: `✅ Message sent to ${channel}`,
    ephemeral: true
  });


}
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
      content: `🗳️ **Support Our Server – Vote every 12 hours!!**

Help our server grow by voting on these sites. Receive in-game rewards for voting!
You can vote for us on the following sites:

🔹  https://top.l2jbrasil.com/index.php?a=in&u=Stayway 
🔹  https://l2network.eu/index.php?a=in&u=Stayway
🔹  https://l2.hopzone.net/site/vote/107325/1
🔹  https://l2top.org/server/l2ahyura/vote/
🔹  https://www.l2servers.com/servers/vote-112840.php
🔹  https://l2servers.com/index.php?a=in&u=Stayway

✅ Every vote counts. Thank you for your support!`,
      ephemeral: true // set to true if you want only the user to see it
    });
  }


});

client.login(process.env.DISCORD_TOKEN);