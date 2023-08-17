import { Context, Permissions } from "../handler";
import owofify from "owoifyx";

export const name = 'owo';
export const permissions: Permissions = [];
export const run = async (ctx: Context) => {
    const args = ctx.args as string[];
    const str = owofify(args.join(' '));
    await ctx.message.channel.sendMessage(str);
}