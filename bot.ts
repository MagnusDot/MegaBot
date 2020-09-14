import * as Discord from "discord.js";
import * as config from './config';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

const bot = new Discord.Client({partials: Object.values(Discord.Constants.PartialTypes)});


const adapter = new FileSync('Database/db.json');
const db = low(adapter);
db.defaults({user: []})
    .write();

const Roleadapter = new FileSync('Database/messageRole.json');
const Roledb = low(Roleadapter);
Roledb.defaults({server: []})
    .write();

import {ping} from "./Commands/ping"
import {Users} from "./Commands/Users"
import {Mute} from "./Commands/Mute";
import {Help} from "./Commands/Help";
import {AddRole} from "./Commands/AddRole";
import {React} from "./Commands/React/React";
import {DeleteReaction} from "./Commands/React/DeleteReaction";
import {Poll} from "./Commands/Poll";
import {ListRole} from "./Commands/ListRole";
import {DeleteRole} from "./Commands/DeleteRole";
import {Unmute} from "./Commands/Unmute";
import {Xp} from "./Commands/Lvl/Xp";
import {GetLevel} from "./Commands/Lvl/GetLevel";


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);

    bot.user.setActivity('$help', {
        type: "WATCHING",
        url: "https://twitter.com/Alois_marcellin"
    }).catch(console.error);
});


bot.on('message', message => {
    if (message.channel.type !== 'dm') {
        const commands = [ping, Users, Xp, Mute, Help, AddRole, Poll, ListRole, DeleteRole, Unmute, GetLevel]
        commands.forEach(Command => {
            Command.parse(message, Discord, bot);
        })
    }
});

bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (user && !user.bot) {
        const reacts = [React]
        reacts.forEach(react => {
            react.parse(reaction, user, Discord);
        })
    }
});

bot.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (user && !user.bot) {
        const reacts = [DeleteReaction]
        reacts.forEach(react => {
            react.parse(reaction, user, Discord);
        })
    }});

bot.login(config.token);
