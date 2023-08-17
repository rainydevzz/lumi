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

    async pingDBs(db: "sodium" | "postgres", log: boolean): Promise<number | undefined> {
        let d: number;
        let t1 = new Date().getTime();
        if(db == "sodium") {
            try {
                await this.sodium.test();
                d = new Date().getTime() - t1;
                if(log) {
                    this.logger.info("SodiumDB online!");
                }
            } catch(e) {
                this.logger.error(e);
                this.logger.warn("SodiumDB offline or misconfigured!");
            }
        } if(db == "postgres") {
            try {
                await this.prisma.test.findFirst();
                d = new Date().getTime() - t1;
                if(log) {
                    this.logger.info("Postgres online!");
                }
            } catch(e) {
                this.logger.warn("Postgres offline or misconfigured!");
            }
        }
        return d;
    }

    async initialize() {
        await this.pingDBs("sodium", true);
        await this.pingDBs("postgres", true);
    }
}