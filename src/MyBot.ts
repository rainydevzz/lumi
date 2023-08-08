import { Client } from 'revolt.js';
import { Sodium } from './sodium';
import { Handler } from './handler';
import { PrismaClient } from '@prisma/client';
import pino from 'pino';
import pretty from 'pino-pretty';

export class MyBot extends Client {
    sodium: Sodium;
    prefix: string;
    handler: Handler;
    prisma: PrismaClient = new PrismaClient();
    logger: pino.Logger = pino(pretty());

    constructor(sodium: Sodium) {
        super();
        this.prefix = process.env.PREFIX;
        this.sodium = sodium;
        this.handler = new Handler(this);
    }

    listenEvents() {
        try {
            for(const e of this.handler.events) {
                this.on(e.name, (...args: any[]) => e.callback(...args, this));
            }
            return this;
        } catch(err) {
            console.error(err);
        }
    }

    async getPrefix(id: string): Promise<string | undefined> {
        const r = await this.sodium.read(id, 'prefix');
        if(typeof r == "string") {
            return;
        } else {
            return r['result'];
        }
    }
}