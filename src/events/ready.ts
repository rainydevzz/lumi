import { MyBot } from "../MyBot";

export const name = 'ready';
export const run = async (bot: MyBot) => {
    await bot.initialize();
    bot.logger.info("Logged In!");
}