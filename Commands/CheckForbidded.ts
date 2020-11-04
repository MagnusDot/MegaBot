import { Command } from '../Class/command';
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
            .find({ id: message.guild.id }).value();
        let forbiddenWords = [];
        if (typeof (server.forbiddenWords) != "undefined" || server.forbiddenWords.length > 0) {
            forbiddenWords = server.forbiddenWords;
            for (let word of forbiddenWords) {
                if (message.content.toLowerCase().replace(word.toLowerCase(), "") != message.content.toLowerCase()) {
                    this.ForbidenWords(message,Discord,word)
                    message.delete();
                    return;
                }
            }
        }
    }


    static ForbidenWords(message, Discord,word) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`One of the words was forbidden by an administrator : ||${word}||`)
            .setAuthor('Megabot', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed).then((msg) => {
            msg.delete({timeout: 2000});
        });;
        return
    }
}
