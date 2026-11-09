import { Collection } from "discord.js";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory this file lives in
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load all available commands
export async function loadCommands(client) {
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, "../commands");
    const commandFolders = await readdir(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        const commandFiles = await readdir(folderPath);

        for (const file of commandFiles) {
            if (!file.endsWith(".js")) continue;

            const filePath = path.join(folderPath, file);
            const command = await import(filePath);

            if (!command.data || !command.execute) {
                console.warn(`[WARNING] ${file} is missing data or execute.`);
                continue;
            }

            client.commands.set(command.data.name, command);
            console.log(`[COMMAND] Loaded: ${command.data.name}`);
        }
    }

    console.log(`[COMMANDS] Loaded ${client.commands.size} commands.`);
}