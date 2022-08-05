import { SlashCommandBuilder } from "@discordjs/builders";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('clip')
		.setDescription('Create a Clip!')
		.addStringOption(option => 
			option.setName('category')
				.setDescription('The category of the clip.')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('content')
				.setDescription('The content of the clip.')
				.setRequired(true)
		)
	
	,
	
	async execute(interaction: any) {
		const category = interaction.options.getString("category")
		const content = interaction.options.getString("content")

        await interaction.deferReply();
        await interaction.editReply(`🔃**Creating clip of ${content} in the ${category} category...**`);

		try {
			const post = await prisma.clip.create({
				data: {
					uid: interaction.user.id,
					category: category,
					content: content
				}
			})

			await interaction.editReply(`✅**Created clip of ${content} in the ${category} category successfully**` + "\n`" + category + "`" + ": " + "`" + content + "`");
        } catch (error: any) {
            await interaction.editReply('❗PingCommand is unavailable.');
            throw new Error(error.message);
        }
    },
}