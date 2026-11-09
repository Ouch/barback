import {
    Client,
    GatewayIntentBits
} from "discord.js";

import { loadCommands } from "./handlers/commandHandler.js";
import { loadEvents } from "./handlers/eventHandler.js";

const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error("DISCORD_TOKEN is missing from .env!");
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

async function startBot() {
    await loadCommands(client);
    await loadEvents(client);

    await client.login(token);
}

startBot().catch((error) => {
    console.error("[FATAL] Failed to start Barhop Barracks:", error);
    process.exitCode = 1;
});