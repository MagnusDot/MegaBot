import {Command} from '../Class/command';
import {displayWords} from '../Class/Functions';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Forbid extends Command {

    static match(message) {
        return message.content.startsWith('$forbid');
    }

    static action(message, Discord, bot) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        const args = message.content.slice(8).trim().split(' ');
        if (args[0] === '') {
            this.howToForbid(message, Discord);
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
                    this.alreadyForbidden(message,Discord,args[i]);
                    return;
                }
            }
        }

        forbiddenWords = [...forbiddenWords, ...args]

        server.assign({
            forbiddenWords
        }).write();

        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('The word(s) has been forbidden')
            .setAuthor('Fobidded  => ' + displayWords(args), 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
    }

    static alreadyForbidden(message, Discord,word) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('That word has been already forbidden')
            .setAuthor('The word \''+word+'\' has been already forbidden', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }

    static howToForbid(message, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('What do want to forbid ?')
            .setAuthor('Forbid', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription("You need to choose a word ")
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                {name: 'How ?', value: "The command work like that : $forbid The word(s) to forbid "},
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }
}
