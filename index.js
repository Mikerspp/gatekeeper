require('dotenv').config();
const { Client, GatewayIntentBits, Partials,ActivityType, EmbedBuilder, 
 ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType
 } = require('discord.js');


const pages = [
  new EmbedBuilder()
    .setTitle('Server Features')
    .setDescription(`⚙️ **AUTO SYSTEMS**

🔹  Auto Play   |    .play
🔹  Auto Potion    | .apon/.apoff
🔹  Auto Loot
🔹  Auto Skills Learn
🔹  Subclass without Quest

✅ Check it live!: https://l2ahyura.com/index.php ;)`),

  new EmbedBuilder()
    .setTitle('Server Features')
    .setDescription(`👤 **NPC SERVICES**

🔹  NPC Premium
🔹  NPC Delevel
🔹  NPC Class Master
🔹  NPC Scheme Buffer
🔹  NPC Vote Reward
🔹  NPC Hero Manager

✅ Check it live!: https://l2ahyura.com/index.php ;)`),

  new EmbedBuilder()
    .setTitle('Server Features')
    .setDescription(`🫂 **COMMUNITY BOARD**

🔹  Premium Access Buffer
🔹  Main Shop (Free to use)
🔹  Custom Teleport
🔹  Services
🔹  Rankings

✅ Check it live!: https://l2ahyura.com/index.php ;)`),
  new EmbedBuilder()
    .setTitle('Server Features')
    .setDescription(`🛡️ **COMBAT & Skills**

🔹  Hero Skills on Subclass
🔹  Global Chat at level 40
🔹  Buffs Duration : 1 Hour
🔹  Max Buffs: 30
🔹  Songs/Dances: 12

✅ Check it live!: https://l2ahyura.com/index.php ;)`),
  new EmbedBuilder()
    .setTitle('Server Features')
    .setDescription(`🔨 **Rates & Enchant System**

🔹  XP/SP: 10x
🔹  Party XP/SP: 2x
🔹  Adena: 20x
🔹  Quest XP/SP: 2x
🔹  Quest Adena: 5x
🔹  Quest Item Drop: 2x
🔹  Drop/Spoil: 3x
🔹  Manor Drop: 3x

🔹  Safe Enchant: +4
🔹  Max Enchant: +16
🔹  Enchant Rate: 66%

✅ Check it live!: https://l2ahyura.com/index.php ;)`),
];


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


  if (interaction.commandName === 'features') {

async function sendPaginated(interaction, pages, timeout = 60_000) {
  let index = 0;

  const page1 = new ButtonBuilder()
    .setCustomId('page1')
    .setLabel('1️⃣')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(index === 0);

  const page2 = new ButtonBuilder()
    .setCustomId('page2')
    .setLabel('2️⃣')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(index === 1);
  
  const page3 = new ButtonBuilder()
    .setCustomId('page3')
    .setLabel('3️⃣')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(index === 2);

  const page4 = new ButtonBuilder()
    .setCustomId('page4')
    .setLabel('4️⃣')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(index === 3);
 
    const page5 = new ButtonBuilder()
    .setCustomId('page5')
    .setLabel('5️⃣')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(index === 4);



  const row = new ActionRowBuilder().addComponents(page1, page2,page3,page4,page5);

  await interaction.reply({
    embeds: [pages[index]],
    components: [row],
    ephemeral: true
  });

  const message = await interaction.fetchReply();

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: timeout,
  });

  collector.on('collect', async (i) => {
    // Lock buttons to command user
    if (i.user.id !== interaction.user.id) {
      return i.reply({ content: 'This isn’t for you 🙂', ephemeral: true });
    }

    if (i.customId === 'close') {
      collector.stop();
      return i.update({ components: [] });
    }

    if (i.customId === 'page1') index=0;
    if (i.customId === 'page2') index=1;
    if (i.customId === 'page3') index=2;
    if (i.customId === 'page4') index=3;
    if (i.customId === 'page5') index=4;

    page1.setDisabled(index === 0);
    page2.setDisabled(index === 1);
    page3.setDisabled(index === 2);
    page4.setDisabled(index === 3);
    page5.setDisabled(index === 4);

    await i.update({
      embeds: [pages[index]],
      components: [row],
    });
  });

 
}

await sendPaginated(interaction, pages);
  }


if (interaction.commandName === 'installation') {



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

  const rulesmess = `Hello Traveler. I heard you need help with the installation!

Please read the instructions carefully!! 
And double check before you ask self-explanatory questions!


:one:  Downloading the files
           The first step is downloading both the game files (~7Gb) and the launcher! You can check them out at https://l2ahyura.com/downloads.php.
           You may find it easier to download them through the links below :slight_smile:.


[Full Game Client (MEGA)](https://mega.nz/file/ZvEQEJbK#RYFeAXesxPNCIXfGhFvrtvzmLP0e_S3ExP-ft8C7Bws)

[Full Game Client (Google Drive)](https://drive.google.com/file/d/1QvjwZUP8EHZvt1TDJWoVDkzLoBm1EnpH/view?usp=drive_link)

[L2Ahyura Launcher](https://l2ahyura.com/downloads/L2AhyuraLauncher.rar)

:two:  Extracting the files
           First, extract the game files in a folder of your choice, we recommend directly on your C: Drive (example C:/L2Ahyura) to make things simpler.
           Afterwards proceed with extracting the whole launcher files inside your L2Ahyura folder, next to it's other folders (like picture below).

https://cdn.discordapp.com/attachments/1492672010361241752/1492675334770917589/image.png?ex=69dc31bc&is=69dae03c&hm=97335045b42a93918f6b7a538daaad1ca0de276981da59cab6a722e0729bb57a&

:three:  Updating the files
           Run the AutoUpdater.exe (we recommend running it as an administrator the first time)
           Press on Repair at least once (like picture below) and let the installer run it's course!

:four:  Play the game!
           You're now more than ready to launch the game! Press on **Play** and call it a day!! 
           (Just make sure you already have an account... If you don't or if you're not sure about your credentials you can do it all from our [Login Page](https://l2ahyura.com/login.php)!!

           `;

  await channel.send(rulesmess);

  return await interaction.reply({
    content: `✅ Message sent to ${channel}`,
    ephemeral: true
  });


}









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

**5. STAFF AND MODERATION**• Follow staff instructions• No public arguing with staff• Appeal via tickets• Staff decisions are final

**6. GENERAL CONDUCT**• No doxxing or personal info• Keep drama private• Use common sense• Help build positive community

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

🔹  /info - What is the server main info?
🔹  /features - What are the server's main features?
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

🔹  https://itopz.com/vote/325716
🔹  https://l2network.eu/index.php?a=in&u=Stayway
🔹  https://l2.hopzone.net/site/vote/107325/1

✅ Every vote counts. Thank you for your support!`,
      ephemeral: true // set to true if you want only the user to see it
    });
  }


});



client.login(process.env.DISCORD_TOKEN);