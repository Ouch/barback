import {
    SlashCommandBuilder,
    EmbedBuilder
} from "discord.js";

import packageJson from "../../package.json";

function formatUptime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
}

export const data = new SlashCommandBuilder()
    .setName("about")
    .setDescription("Learn about the Barhop Barracks project");

export async function execute(interaction) {
    const uptime = formatUptime(interaction.client.uptime);

    const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle("🍻 Barhop Barracks")
        .setDescription(
            "A project built to make an easier time for organizing hangouts " +
            "through local bars, events, and nights out."
        )
        .addFields(
            {
                name: "The Idea",
                value:
                    "Pit stop for discovering local bars and events, " +
                    "coordinate outings, and make communication easier than sms."
            },
            {
                name: "Future Features",
                value:
                    "• Local bar and event discovery\n" +
                    "• Events and planning\n" +
                    "• Transparent bar fund tracking\n" +
                    "• Just general bull-shittery between friends"
            },
            {
                name: "Technical Information",
                value:
                    `**Version:** ${packageJson.version}\n` +
                    `**Runtime:** Bun (https://bun.com)\n` +
                    `**Language:** JavaScript\n` +
                    `**Library:** discord.js\n` +
                    `**Uptime:** ${uptime}`
            },
                        {
                name: "Road Map and contact",
                value:
                    `**Github:** https://Github.com/Ouch/barback\n` +
                    `**Personal Site:** https://remy.gg\n` +
                    `**Contact:** Obviously Jeremy or *remy.js* on Discord\n`
            }
        )
        .setFooter({
            text: "Barhop Barracks • Fuckin cool words"
        })
        .setTimestamp();

    await interaction.reply({
        embeds: [embed]
    });
}