import { REST, Routes } from "discord.js";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
    throw new Error("Missing DISCORD_TOKEN, CLIENT_ID, or GUILD_ID in .env");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFolders = await readdir(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = await readdir(folderPath);

    for (const file of commandFiles) {
        if (!file.endsWith(".js")) continue;

        const filePath = path.join(folderPath, file);
        const command = await import(filePath);

        commands.push(command.data.toJSON());
        console.log(`[DEPLOY] Found command: ${command.data.name}`);
    }
}

const rest = new REST({ version: "10" }).setToken(token);

try {
    console.log("[DEPLOY] Registering slash commands...");

    await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands }
    );

    console.log(`[DEPLOY] Successfully registered ${commands.length} commands.`);
} catch (error) {
    console.error("[DEPLOY] Failed to register commands:", error);
}