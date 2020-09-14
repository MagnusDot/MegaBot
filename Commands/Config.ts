import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Config extends Command {

    static match(message) {
        return message.content.startsWith('$config')
    }

    static action(message, Discord, bot) {

        const adapter = new FileSync('Database/serverConfig.json');
        const db = low(adapter);

        let Guild = db.get('server')
            .find({id: message.guild.id})
            .value();

        if(Guild == undefined){
            db.get('server')
                .push({id: message.guild.id})
                .write();
        }

        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        const args = message.content.slice(5).trim().split(' ');
        if (args[0] === '') {
            return;
        }

        message.channel.send('oui');


    }
}
