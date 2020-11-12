import {Command} from '../../Class/command';
import {displayWords} from '../../Class/Functions';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Listforbid extends Command {

    static match(message) {
        return message.content.startsWith('$listforbid')
    }

    static action(message, Discord, bot) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;

        const adapter = new FileSync('Database/serverConfig.json');
        const db = low(adapter);

        const server = db.get('server')
            .find({id: message.guild.id}).value();

        let forbiddenWords = [];
        if (typeof(server.forbiddenWords) != "undefined") {
            forbiddenWords = server.forbiddenWords;
        }

        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('List off all forbidden words')
            .setDescription('Words  => ' + displayWords(forbiddenWords), 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
    }
}
