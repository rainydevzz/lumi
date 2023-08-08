import path from 'path';
import fs from 'fs';
import { Message, User } from 'revolt.js';
import { MyBot } from './MyBot';
import { run } from './commands/reaction';

export type Permissions = ("Video" | "Masquerade" | "ManageChannel" | "ManageServer" | "ManagePermissions" | "ManageRole" | "ManageCustomisation" | "KickMembers" | "BanMembers" | "TimeoutMembers" | "AssignRoles" | "ChangeNickname" | "ManageNicknames" | "ChangeAvatar" | "RemoveAvatars" | "ViewChannel" | "ReadMessageHistory" | "SendMessage" | "ManageMessages" | "ManageWebhooks" | "InviteOthers" | "SendEmbeds" | "UploadFiles" | "React" | "Connect" | "Speak" | "MuteMembers" | "DeafenMembers" | "MoveMembers" | "GrantAllSafe")[];

interface Command {
    name: string;
    callback: Function;
    permissions: Permissions;
}

interface Event {
    name: any;
    callback: Function;
}

export interface Context {
    name: string;
    args: (string | number)[];
    bot: MyBot;
    message: Message;
    handler: Handler
}

export const reactions = [
    "airkiss",
    "angrystare",
    "bite",
    "bleh",
    "blush",
    "brofist",
    "celebrate",
    "cheers",
    "clap",
    "confused",
    "cool",
    "cry",
    "cuddle",
    "dance",
    "drool",
    "evillaugh",
    "facepalm",
    "handhold",
    "happy",
    "headbang",
    "hug",
    "kiss",
    "laugh",
    "lick",
    "love",
    "mad",
    "nervous",
    "no",
    "nom",
    "nosebleed",
    "nuzzle",
    "nyah",
    "pat",
    "peek",
    "pinch",
    "poke",
    "pout",
    "punch",
    "roll",
    "run",
    "sad",
    "scared",
    "shrug",
    "shy",
    "sigh",
    "sip",
    "slap",
    "sleep",
    "slowclap",
    "smack",
    "smile",
    "smug",
    "sneeze",
    "sorry",
    "stare",
    "stop",
    "surprised",
    "sweat",
    "thumbsup",
    "tickle",
    "tired",
    "wave",
    "wink",
    "woah",
    "yawn",
    "yay",
    "yes"
]

export class Handler {
    commands: Command[] = [];
    events: Event[] = [];
    bot: MyBot;

    constructor(bot: MyBot) {
        this.collectCommands();
        this.collectEvents();
        this.bot = bot;
    }

    collectCommands() {
        let commandFiles = fs.readdirSync(path.join(__dirname, 'commands'));
        for(const f of commandFiles) {
            const { permissions, run, name } = require(path.join(__dirname, `commands/${f}`));
            this.commands.push({name: name, callback: run, permissions: permissions});
        }
    }

    collectEvents() {
        let eventFiles = fs.readdirSync(path.join(__dirname, 'events'));
        for(const f of eventFiles) {
            const { run, name } = require(path.join(__dirname, `events/${f}`));
            this.events.push({name: name, callback: run});
        }
    }

    parseMention(mention: string): undefined | User {
        if (typeof mention !== 'string' || mention.length <= 2) {
            return;
        }
        return this.bot.users.get(mention.slice(2, -1).toUpperCase());
    }

    async processCommand(message: Message, prefix: string) {
        const args = message.content.slice(prefix.length).trim().split(/ +/).map(i => i.toLowerCase()) as (string | number)[];
        const name = args[0] as string;
        const ctx: Context = {name: name, args: args, bot: this.bot, message: message, handler: this};
        if(reactions.includes(name)) {
            await run(ctx);
            return;
        }
        const command = this.commands.find(c => c.name == name);
        if(!command) {
            await message.channel.sendMessage(`Command ${name} not found.`);
            return;
        }
        const p = message.member.hasPermission(message.member.server, ...command.permissions);
        if(!p) {
            await message.channel.sendMessage("hmm.. it appears you are missing the correct permissions to execute this command.");
        }
        args.splice(0, 1);
        for(const a of args) {
            const b = a as string;
            const num = parseInt(b, 10);
            if(!isNaN(num)) {
                args[args.indexOf(a)] = num;
            }
        }
        await command.callback(ctx);
    }
}