import { Context, Permissions } from "../handler";

export const name = 'ping';
export const permissions: Permissions = [];
export const run = async (ctx: Context) => {
    const s = await ctx.bot.pingDBs("sodium", false) ?? "Unavailable";
    const p = await ctx.bot.pingDBs("postgres", false) ?? "Unavailable";
    const t = new Date().getTime();
    await fetch('https://api.revolt.chat');
    await ctx.message.channel.sendMessage(`### Ping Stats\n**API:** ${new Date().getTime() - t}ms\n**SodiumDB:** ${s}ms\n**Postgres:** ${p}ms`);
}