const { WebhookClient, Collection, PermissionsBitField, Client, ChannelType, ActivityType, EmbedBuilder  } = require('discord.js');
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildMembers', 'GuildPresences'] });

const { readdirSync } = require('node:fs');

var configLoader = require('node-env-config-file-loader');
var config = configLoader.load('./config.yml');



client.slashcommands = new Collection();
client.slashdatas = [];



const slashcommands = [];
readdirSync("./source/commands").forEach(async (file) => {
    const command = await require(__dirname + `/commands/${file}`);
    client.slashdatas.push(command.data.toJSON());
    client.slashcommands.set(command.data.name, command);
});



readdirSync("./source/events").forEach(async (file) => {
    const event = await require(__dirname + `/events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
});



async function setBotPresence() {
    let presenceType = ActivityType.Playing;
    let presenceStatus = 'online';
    let textResponseI = 0;
    let textResponse = config.bot.status.text[textResponseI];

    if (config.bot.status.activity === 'playing' || config.bot.status.activity === 'PLAYING') presenceType = ActivityType.Playing;
    if (config.bot.status.activity === 'watching' || config.bot.status.activity === 'WATCHING') presenceType = ActivityType.Watching;
    if (config.bot.status.activity === 'listening' || config.bot.status.activity === 'LISTENING') presenceType = ActivityType.Listening;
    if (config.bot.status.activity === 'streaming' || config.bot.status.activity === 'STREAMING') presenceType = ActivityType.Streaming;
    if (config.bot.status.activity === 'competing' || config.bot.status.activity === 'COMPETING') presenceType = ActivityType.Competing;
    if (config.bot.status.status === 'online' || config.bot.status.status === 'ONLINE') presenceStatus = 'online';
    if (config.bot.status.status === 'idle' || config.bot.status.status === 'IDLE') presenceStatus = 'idle';
    if (config.bot.status.status === 'dnd' || config.bot.status.status === 'DND') presenceStatus = 'dnd';
    if (config.bot.status.status === 'invisible' || config.bot.status.status === 'INVISIBLE') presenceStatus = 'invisible';

    if (config.bot.status.activity === 'streaming' || config.bot.status.activity === 'STREAMING') {
        await client.user.setPresence({
            activities: [{ name: `${textResponse}`, type: presenceType, url: config.bot.status.twitch }],
            status: presenceStatus,
        });
        textResponseI++;
        if (textResponseI > config.bot.status.text.length) textResponseI = 0;
    } else {
        await client.user.setPresence({
            activities: [{ name: `${textResponse}`, type: presenceType }],
            status: presenceStatus,
        });
        textResponseI++;
        if (textResponseI > config.bot.status.text.length) textResponseI = 0;
    }
}
client.setBotPresence = setBotPresence;


client.config = config;



client.login(config.bot.token);
