import { Message } from "revolt.js";
import { Permissions } from "../handler";
import { Context } from "vm";

export const name = 'ping';
export const permissions: Permissions = [];
export const run = async (ctx: Context) => {
    await ctx.message.channel.sendMessage('pong!');
}