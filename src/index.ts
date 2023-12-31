import { Message } from "revolt.js";
import { MyBot } from "./MyBot";
import { Sodium } from "./sodium";
import dotenv from 'dotenv';

dotenv.config();

process.on('uncaughtException', (e) => {console.error(e)});

new MyBot(new Sodium(`${process.env.SODIUM_URL}:${process.env.SODIUM_PORT}`, process.env.SODIUM_PASSWORD))
    .listenEvents()
    .loginBot(process.env.TOKEN);