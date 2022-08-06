import { SlashCommandBuilder} from "discord.js"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {
	data: new SlashCommandBuilder()
		.setName("delete")
		.setDescription("Delete a clip.")
		.addStringOption(option => 
			option.setName('category')
				.setDescription("Which Category to delete the clip.")
				.setRequired(true)
		)	
		.addStringOption(option => 
			option.setName("content")
				.setDescription("Which clip do you want to delete.")	
				.setRequired(true)
		)
	, 	
	async execute(interaction: any) {
		const category = interaction.options.getString("category");
		const content = interaction.options.getString("content");
		await interaction.deferReply()
		await interaction.editReply("**Deleting** " + "`" + category + "`:`" + content + "`" + " **...**")
			
		try {

			await prisma.clip.deleteMany({
				where: {
					uid: interaction.user.id,
					category: category,
					content: content
				}
			}).then(async() => {
				await interaction.editReply("**✅Deleted **" + "`" + category + "`:`" + content + "`" + " **successfully**")
			})

		} catch (error: any) {
			await interaction.editReply("❗Error Occured", error)
			console.error(error)
		}
		

	}
}