import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Users extends Command {

    static match(message) {
        return message
    }

    static action(message, Discord, bot) {

        const adapter = new FileSync('Database/db.json');
        const db = low(adapter);
        const userId: string = message.guild.id + "_" + message.author.id;

        let User = db.get('user')
            .find({id: userId})
            .value();

        if (User === undefined) {
            db.get('user').push({
                id: userId,
                server: message.guild.id,
                title: message.author.username,
                UserXp: 0,
                UserLvl: 0,
                warn: 0,
                muted: {}
            }).write()
        }
    }
}
