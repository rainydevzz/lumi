import { MyBot } from "../MyBot";

export const name = 'ready';
export const run = async (bot: MyBot) => {
    bot.logger.info("Logged In!");
}