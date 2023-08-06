import path from 'path';
import fs from 'fs';
import { Message } from 'revolt.js';
import { MyBot } from './MyBot';

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

    async processCommand(message: Message) {
        const args = message.content.slice(this.bot.prefix.length).trim().split(/ +/).map(i => i.toLowerCase());
        if(args.length == 0) {
            await message.channel.sendMessage("Did you forget to type the command?");
            return;
        }
        const name = args[0];
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
        await command.callback(message, this.bot, args);
    }
}