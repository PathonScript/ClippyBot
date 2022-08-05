import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { SlashCommandBuilder } from "discord.js";
module.exports = {
	data: new SlashCommandBuilder()
		.setName("list")
		.setDescription("List all of your clips.")
	,
	async execute(interaction: any) { 
		await interaction.deferReply();
		await interaction.editReply(`Finding your clips...`);

		try {
			const findUser = await prisma.clip.findMany({
				
				where: {
					uid: interaction.user.id
				}
			})
			let replyText: string = "";
			findUser.forEach(user => replyText += `${user.content}\n`)
			await interaction.editReply(replyText);
		} catch (error:any) {
			await interaction.editReply('ListCommand is unavailable.');
            throw new Error(error.message);
		}

	}
}