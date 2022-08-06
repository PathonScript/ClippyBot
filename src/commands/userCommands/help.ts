import { SlashCommandBuilder } from "discord.js";
import { exportCommandsPaths } from '../../files';
module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("List all available commands")
	,
	async execute(interaction: any) {
		await interaction.deferReply();
		let commands: string = "";
		try {
			exportCommandsPaths.forEach(path => {
				commands += "`" + path.split("/")[path.split("/").length - 1] + "`\n"
			})

			await interaction.editReply(commands);
		} catch (error) {
			console.error(error);
		}

	}
}