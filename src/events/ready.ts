import { MyBot } from "../MyBot";

export const name = 'ready';
export const run = async (bot: MyBot) => {
    console.log(`Logged in as ${bot.user.username}`)
}