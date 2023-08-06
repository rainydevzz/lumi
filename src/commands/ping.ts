import { Message } from "revolt.js";
import { Permissions } from "../handler";

export const name = 'ping';
export const permissions: Permissions = [];
export const run = async (message: Message) => {
    await message.channel.sendMessage("pong!");
}