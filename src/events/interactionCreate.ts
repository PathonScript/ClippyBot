import { BotClient } from "../types";

module.exports = {
    name: "interactionCreate",
    once: true,
    async execute(interaction: any, client: BotClient) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (e:any) {
            console.error(e);
            throw new Error(e.message);
        }
    },
};