const { InteractionType, Events, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        let client = interaction.client;
        var config = client.config;

        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = client.slashcommands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.run(client, interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Bir hata oluştu!', ephemeral: true });
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId === '') {
                
            }
        }

        if (interaction.isStringSelectMenu()) {
            if (interaction.customId === '') {
                
            }
        }

        if (interaction.isRoleSelectMenu()) {
            if (interaction.customId === '')  {
                
            }
        }

        if (interaction.isChannelSelectMenu()) {
            if (interaction.customId === '') {
                
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId === '') {
                
            }
        }
    },
};
