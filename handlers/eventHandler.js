import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadEvents(client) {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = await readdir(eventsPath);

    for (const file of eventFiles) {
        if (!file.endsWith(".js")) continue;

        const filePath = path.join(eventsPath, file);
        const eventModule = await import(pathToFileURL(filePath).href);

        const event = eventModule.default;

        if (!event?.name || typeof event.execute !== "function") {
            console.warn(`[WARNING] Invalid event module: ${file}`);
            continue;
        }

        const method = event.once ? "once" : "on";

        client[method](event.name, (...args) => event.execute(...args));

        console.log(`[EVENT] Loaded: ${event.name}`);
    }
}