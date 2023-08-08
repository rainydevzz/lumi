import { Context, Permissions } from "../handler";

export const name = 'reaction';
export const permissions: Permissions = [];
export const run = async (ctx: Context) => {
    let t = '';
    if(ctx.args[1] != undefined) {
        const user = ctx.handler.parseMention(ctx.args[1] as string);
        if(!user) {
            await ctx.message.channel.sendMessage("the last argument must be a mention.");
            return;
        }
        t += `to ${user.username}`;
    }
    const res = await fetch(`https://api.otakugifs.xyz/gif?reaction=${ctx.args[0]}`);
    let img = await res.json();
    let cn = `${ctx.message.author.username} does ${ctx.name} ${t} .. uwaa!\n${img.url}`;
    await ctx.message.channel.sendMessage({content: cn});
}