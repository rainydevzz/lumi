import { Client } from 'revolt.js';
import { Sodium } from './sodium';
import { Handler } from './handler';

export class MyBot extends Client {
    sodium: Sodium;
    prefix: string;
    handler: Handler;

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
        } catch(err) {
            console.error(err);
        }
    }
}