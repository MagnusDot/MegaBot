import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Config extends Command {

    static match(message) {
        return message.content.startsWith('$config')
    }

    static action(message, Discord, bot) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        const args = message.content.slice(7).trim().split(' ');
        if (args[0] == '') {
            return;
        }

        const adapter = new FileSync('Database/serverConfig.json');
        const db = low(adapter);

        let Guild = db.get('server')
            .find({id: message.guild.id})
            .value();

        if (Guild == undefined) {
            db.get('server')
                .push({id: message.guild.id})
                .write();
        }

        this.VerificationOfExistence(message);

        if (args.length >= 1) {
            switch (args[0]) {
                case 'lvl':
                    if (args[1] === "true") {
                        db.get('server')
                            .find({id: message.guild.id})
                            .assign({LvlActivate: true})
                            .write();
                        this.OptionUpdated(Discord,message,'Level', 'True')
                    } else {
                        db.get('server')
                            .find({id: message.guild.id})
                            .assign({LvlActivate: false})
                            .write();
                        this.OptionUpdated(Discord,message,'Level', 'False')
                    }

                    break;
                default:
                    return;
            }
        }

        message.channel.send('oui');
    }

    static VerificationOfExistence(message) {
        const adapter = new FileSync('Database/serverConfig.json');
        const db = low(adapter);

        let Guild = db.get('server')
            .find({id: message.guild.id})
            .value();
        if (Guild == undefined) {
            db.get('server')
                .push({id: message.guild.id})
                .write();
            return;
        }

        if (Guild.LvlActivate == undefined) {
            db.get('server')
                .find({id: message.guild.id})
                .assign({LvlActivate: true})
                .write();
        }
    }

    static OptionUpdated(Discord, message, option, result){
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`The ${option} is Updated`)
            .setAuthor(`MegaBot`, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                {name:`${option}`,value:`Is set to ${result}`}
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.author.send(Embed);
    }

    static GetArgument(message, argument){
        const adapter = new FileSync('Database/serverConfig.json');
        const db = low(adapter);
        let data = db.get('server')
            .find({id: message.guild.id})
            .value();

        let result: Boolean;

        return data[argument]
    }

    static ExpectedConfigResult(data, result){
        return data == result;
    }
}
