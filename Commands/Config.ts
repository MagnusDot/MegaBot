import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Config extends Command {

    static match(message) {
        return message.content.startsWith('$config')
    }

    static action(message, Discord, bot) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;

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

        const args = message.content.slice(7).trim().split(' ');
        if (args.length == 1) {
            return;
        }
        this.VerificationOfExistence(Guild,db,message);


        message.channel.send('oui');
    }

    static VerificationOfExistence(Guild, db, message){
        if(Guild.LvlActivate == undefined){
            console.log("oo")
            db.get('server')
                .find({id: message.guild.id})
                .assign({LvlActivate: true})
                .write();
        }

    }
}
