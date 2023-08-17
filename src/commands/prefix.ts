import { Context, Permissions } from "../handler";

export const name = 'prefix';
export const permissions: Permissions = ["ManageServer"];
export const run = async (ctx: Context) => {
    let pr = ctx.args[0];
    let r = await ctx.bot.sodium.read('prefix');
    if(typeof r == "string") { // checks if db structure exists and if not, creates it and writes
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