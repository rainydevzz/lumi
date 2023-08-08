import { Context, Permissions } from "../handler";

export const name = 'prefix';
export const permissions: Permissions = ["ManageServer"];
export const run = async (ctx: Context) => {
    if(!Array.isArray(ctx.args)) {
        await ctx.message.channel.sendMessage("invalid args supplied");
        return;
    }
    let pr = ctx.args[0];
    let r = await ctx.bot.sodium.read('prefix');
    if(typeof r == "string") {
        let data = {prefix: {}};
        data['prefix'][ctx.message.member.server._id] = pr;
        await ctx.bot.sodium.create(data);
    } else {
        r = r['result'];
        r[ctx.message.member.server._id] = pr;
        await ctx.bot.sodium.create({prefix: r});
    }
    await ctx.message.channel.sendMessage("prefix set.");
}