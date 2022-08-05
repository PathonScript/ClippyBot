import "dotenv/config";
import "./deploy-commands";

import { Client, Collection, IntentsBitField } from "discord.js";
import { BotClient, BotCommand } from "./types";
import { commandFiles, eventFiles } from "./files";

const client = new Client({
	intents: [
		IntentsBitField.Flags.GuildPresences,
    	IntentsBitField.Flags.GuildMembers
	],
}) as BotClient;
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`) as BotCommand;
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file.substring(0, file.length - 3)}`);

    if (event.on) {
        client.on(event.name, (...args) => event.execute(...args, client));
        continue;
    }

    client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(process.env.TOKEN);
