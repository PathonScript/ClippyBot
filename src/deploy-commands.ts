import dotenv from 'dotenv'
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { exportCommandsPaths } from "./files";
import { BotCommand } from "./types";
dotenv.config();

const commands: object[] = [];

for (const path of exportCommandsPaths) {
    const command = require(path.substring(0, path.length - 3)) as BotCommand;
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN as string);

rest.put(
    Routes.applicationCommands(
        process.env.CLIENT_ID as string,
    ),
    { body: commands }
);