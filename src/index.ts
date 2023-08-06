import { MyBot } from "./MyBot";
import { Sodium } from "./sodium";
import dotenv from 'dotenv';

dotenv.config();

const bot = new MyBot(new Sodium(`${process.env.SODIUM_URL}:${process.env.SODIUM_PORT}`, process.env.SODIUM_PASSWORD));
bot.listenEvents();

bot.loginBot(process.env.TOKEN);