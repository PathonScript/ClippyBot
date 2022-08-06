import fs from "fs";

const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

const eventFiles = fs
    .readdirSync("./src/events")
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

export { commandFiles, eventFiles };