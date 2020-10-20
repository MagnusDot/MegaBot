import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class CheckForbidded extends Command {

    static match(message) {
        return !message.content.startsWith("$") && !message.author.bot;
    }

    static action(message, Discord, bot) {
        const Configadapter = new FileSync('Database/serverConfig.json');
        const Configdb = low(Configadapter);

        const server = Configdb.get('server')
            .find({id: message.guild.id}).value();
        let forbiddenWords = [];
        if (typeof (server.forbiddenWords) != "undefined") {
            forbiddenWords = server.forbiddenWords;
        }
        for (let word of forbiddenWords) {
            if (message.content.toLowerCase().replace(word.toLowerCase(), "") != message.content.toLowerCase()) {
                message.delete();
                return;
            }
        }
    }
}
