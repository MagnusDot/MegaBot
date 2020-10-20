import {Command} from '../Class/command';
import {displayWords} from '../Class/Functions';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Unforbid extends Command {

    static match(message) {
        return message.content.startsWith('$unforbid');
    }

    static action(message, Discord, bot) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        const args = message.content.slice(9).trim().split(' ');
        if (args[0] === '') {
            this.howToUnforbid(message, Discord);
            return;
        }

        const adapter = new FileSync('Database/serverConfig.json');
        const db = low(adapter);

        const server = db.get('server')
            .find({id: message.guild.id});

        let forbiddenWords = [];
        if (typeof(server.value().forbiddenWords) != "undefined") {
            forbiddenWords = server.value().forbiddenWords;
        }
        for (let i=0;i<args.length;i++) {
            for (let j=0;j<forbiddenWords.length;j++) {
                if (args[i] == forbiddenWords[j]) {
                    forbiddenWords.splice(j,1);
                    break;
                }
            }
        }

        server.assign({
            forbiddenWords
        }).write();

        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('The word(s) has been unforbidded')
            .setAuthor('Unfobidded  => ' + displayWords(args), 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
    }

    static howToUnforbid(message, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('What do want to unforbid ?')
            .setAuthor('Unforbid', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription("You need to choose a word ")
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                {name: 'How ?', value: "The command work like that : $unforbid The word(s) to unforbid "},
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }
}
