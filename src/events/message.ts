import { Message } from "revolt.js";
import { MyBot } from "../MyBot";

export const name = 'message';
export const run = async (message: Message, bot: MyBot) => {
    const p = await bot.getPrefix(message.member.server._id) ?? bot.prefix;
    if(message.content?.startsWith(p)) {
        await bot.handler.processCommand(message, p);
    }
}