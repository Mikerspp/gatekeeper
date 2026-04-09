require('dotenv').config();
const { Client, GatewayIntentBits, Partials,ActivityType } = require('discord.js');



const client = new Client({ intents: [
GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
  ]
 });

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  

 client.user.setActivity('Type /help for commands', {
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

**PUNISHMENT:** Warning → Mute → Temp Ban → Permanent Ban 
**SEVERE VIOLATIONS = IMMEDIATE BAN:** 

By reading, you agree to follow these rules. Rules may be updated anytime.`;

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
if (interaction.commandName === 'info') {
        return await interaction.reply({
      content: `🗳️ **L2Ahyura GENERAL INFO**

🔹  Version: High Five part 6
🔹  XP/SP: 10x
🔹  Adena: 10x
🔹  Drop: 3x
🔹  Spoil: 5x
🔹  Max lvl: 85
🔹  Max box: 1

✅ Check our FAQs: https://l2ahyura.com/faq.php ;)`,
      ephemeral: false // set to true if you want only the user to see it
    });
  }

  if (interaction.commandName === 'premium') {
        return await interaction.reply({
      content: `🗳️ **Premium Packages**

🔹  **Starter pack** 5€
          🔹 +1 Premium Days
          🔹 x5kk Adena
          🔹 x10 VIP Coin
          🔹 x3 Blessed Scroll Armor S
🔹  **Bronze pack** 10€
          🔹 +3 Premium Days
          🔹 x10kk Adena
          🔹 x20 VIP Coin
          🔹 x3 Blessed Scroll Armor S
          🔹 x1 Blessed Scroll Weapon S
🔹  **Silver pack** 20€
          🔹 +7 Premium Days
          🔹 x20kk Adena
          🔹 x50 VIP Coin
          🔹 x5 Blessed Scroll Armor S
          🔹 x2 Blessed Scroll Weapon S
          🔹 x3 Giant's Codex
🔹  **Gold pack** 50€
          🔹 +15 Premium Days
          🔹 x50kk Adena
          🔹 x150 VIP Coin
          🔹 x7 Blessed Scroll Armor S
          🔹 x3 Blessed Scroll Weapon S
          🔹 x5 Giant's Codex
🔹  **Platinum pack** 100€
          🔹 +31 Premium Days
          🔹 x250kk Adena
          🔹 x500 VIP Coin
          🔹 x15 Blessed Scroll Armor S
          🔹 x6 Blessed Scroll Weapon S
          🔹 x25 Giant's Codex

✅ Consider donating at https://l2ahyura.com/donate.php ;)`,
      ephemeral: true // set to true if you want only the user to see it
    });
  }


if (interaction.commandName === 'help') {
        return await interaction.reply({
      content: `🗳️ **COMMANDS**

🔹  /info - Info on the server
🔹  /vote - What websites can you vote on??
🔹  /premium - What do our premium packages offer??

✅ Consider donating at https://l2ahyura.com/donate.php ;)`,
      ephemeral: true // set to true if you want only the user to see it
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