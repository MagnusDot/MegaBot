import * as Discord from "discord.js";
import * as config from './config';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


const adapter = new FileSync('Database/db.json');
const db = low(adapter);
db.defaults({ user: [] })
    .write();

const Roleadapter = new FileSync('Database/messageRole.json');
const Roledb = low(Roleadapter);
Roledb.defaults({ server: [] })
    .write();

const Configadapter = new FileSync('Database/serverConfig.json');
const Configdb = low(Configadapter);
Configdb.defaults({ server: [] })
    .write();

import { ping } from "./Commands/ping";
import { Users } from "./Commands/Users";
import { Forbid } from "./Commands/Forbid";
import { Unforbid } from "./Commands/Unforbid";
import { Listforbid } from "./Commands/Listforbid";
import { CheckForbidded } from "./Commands/CheckForbidded";
import { Mute } from "./Commands/Mute";
import { Help } from "./Commands/Help";
import { AddRole } from "./Commands/React/AddRole";
import { React } from "./Commands/React/React";
import { DeleteReaction } from "./Commands/React/DeleteReaction";
import { Poll } from "./Commands/Poll";
import { Clear } from "./Commands/Clear";
import { ListRole } from "./Commands/React/ListRole";
import { DeleteRole } from "./Commands/React/DeleteRole";
import { Unmute } from "./Commands/Unmute";
import { Xp } from "./Commands/Lvl/Xp";
import { GetLevel } from "./Commands/Lvl/GetLevel";
import { Server } from "./Commands/Server"
import { Config } from "./Commands/Config";


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);

    bot.user.setActivity('$help', {
        type: "WATCHING",
        url: "https://twitter.com/Alois_marcellin"
    }).catch(console.error);
});


bot.on('message', message => {
    if (message.channel.type !== 'dm') {
        const commands = [ping, Users, Xp, Mute, Help, AddRole, Poll, Clear, ListRole, DeleteRole, Unmute, GetLevel, Server, Config, Forbid, Listforbid, Unforbid, CheckForbidded]
        commands.forEach(Command => {
            Command.parse(message, Discord, bot);
        });
    }
});

bot.on("messageReactionAdd", async (reaction, user) => {
    if (user && !user.bot) {
        const reacts = [React]
        reacts.forEach(react => {
            react.parse(reaction, user, Discord);
        })
    }
});

bot.on("messageReactionRemove", async (reaction, user) => {
    if (user && !user.bot) {
        const reacts = [DeleteReaction]
        reacts.forEach(react => {
            react.parse(reaction, user, Discord);
        })
    }
});

bot.login(config.token);
