import { User } from "revolt.js";
import { Context, Permissions } from "../handler";

export const name = 'reaction';
export const permissions: Permissions = [];
export const run = async (ctx: Context) => {
    let t = '';
    if(ctx.args[1]) {
        if(!(ctx.args[1] as User).username) {
            await ctx.message.channel.sendMessage("Last argument must be a mention.");
            return;
        }
        t += `to ${(ctx.args[1] as any).username}`;
    }
    const res = await fetch(`https://api.otakugifs.xyz/gif?reaction=${(ctx.args[0] as string).toLowerCase()}`);
    let img = await res.json();
    let cn = `${ctx.message.author.username} does ${ctx.name} ${t} .. uwaa!\n${img.url}`;
    await ctx.message.channel.sendMessage({content: cn});
}