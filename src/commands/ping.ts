import { SlashCommandBuilder } from "@discordjs/builders";
module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with a pong!"),
    
    async execute(interaction: any) {
        const time = new Date();
        await interaction.deferReply();
        await interaction.editReply('Pong !');

        try {
            const ms = (time.getMilliseconds() - new Date().getMilliseconds());
            await interaction.editReply(`Pong !\n${ms} ms`);
        } catch (error: any) {
            await interaction.editReply('PingCommand is unavailable.');
            throw new Error(error.message);
        }
    },
};