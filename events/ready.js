import { Events } from "discord.js";

export default {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        console.log("--------------------------------");
        console.log("  BARHOP BARRACKS BOT ONLINE");
        console.log("--------------------------------");
        console.log(`Logged in as: ${client.user.tag}`);
        console.log(`Bot ID: ${client.user.id}`);
        console.log(`Commands: ${client.commands.size}`);
    }
};