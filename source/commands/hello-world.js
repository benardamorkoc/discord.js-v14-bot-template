const { EmbedBuilder, PermissionsBitField, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello-world')
        .setDescription('Test command'),
        run: async (client, interaction) => {
            await interaction.reply({ content: 'Hello!', ephemeral: true });
        }
    };
