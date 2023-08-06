import { Message } from "revolt.js";
import { MyBot } from "../MyBot";

export const name = 'message';
export const run = async (message: Message, bot: MyBot) => {
    if(message.content?.startsWith(bot.prefix)) {
        await bot.handler.processCommand(message);
    }
}