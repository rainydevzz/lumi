import { Message } from "revolt.js";
import { MyBot } from "../MyBot";

interface Reaction {
    type: 'MessageReact';
    id: string;
    channel_id: string;
    user_id: string;
    emoji_id: string;
}

interface StarboardStruct {
    server: string;
    message: string;
    users: string[];
}

interface Starboard {
    stars: StarboardStruct[]
}

export const name = 'packet';
export const run = async (data: any, bot: MyBot) => {
    if(data.type == 'MessageReact') {
        let payload = data as Reaction;
        if(payload.emoji_id == '⭐') {    
            let res = await bot.sodium.read('stars');
            console.log(res['result'].find(m => m.message == '01H80HSG1J50MTC9KM21V5Q78X').users.includes('01H6CXC63A82P9G9S52RHR4SAZ'));
            if(typeof res === 'string') {
                let d: Starboard = {stars: []};
                d['stars'].push({server: bot.channels.get(payload.channel_id).server_id, message: payload.id, users: [payload.user_id]});
                await bot.sodium.create(d);
            } else if(!res['result'].find(m => m.message == payload.id)) {
                res = res['result'];
                res.push({server: bot.channels.get(payload.channel_id).server_id, message: payload.id, users: [payload.user_id]});
                await bot.sodium.create(res);
            } else {
                if(!res['result'].find(m => m.message == payload.id).users.includes(payload.user_id)) {
                    res['result'].find(m => m.message == payload.id).users.push(payload.user_id);
                }
            }
        }
    }
}