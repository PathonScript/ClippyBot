import { SlashCommandBuilder } from "@discordjs/builders";
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clip')
		.setDescription('Create a Clip!'),
	async execute(interaction: any) {
        const time = new Date();
        await interaction.deferReply();
        await interaction.editReply('Clip !');

        try {
            const ms = (time.getMilliseconds() - new Date().getMilliseconds());
            await interaction.editReply(`Clip command working !\n${ms} ms`);
        } catch (error: any) {
            await interaction.editReply('PingCommand is unavailable.');
            throw new Error(error.message);
        }
    },
}