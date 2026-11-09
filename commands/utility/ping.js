import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check Barback's connection to Discord");

export async function execute(interaction) {
    const sent = await interaction.reply({
        content: "🏓 Pong!",
        withResponse: true
    });

    const latency = sent.resource.message.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = interaction.client.ws.ping;

    await interaction.editReply({
        content:
            `🏓 **Pong!**\n` +
            `Message Latency: ${latency}ms\n` +
            `API Latency: ${apiLatency}ms`
    });
}