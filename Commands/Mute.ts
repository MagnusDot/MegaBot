import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Mute extends Command {

    static match(message) {
        return message.content.startsWith('$mute')
    }

    static action(message, Discord, bot) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
        const args = message.content.slice(5).trim().split(' ');
        if (args[0] === '') {
            this.howToMute(message, Discord);
            return;
        }


        const user = message.mentions.users.first();
        if (user === undefined) {
            this.howToMute(message, Discord);
            return;
        }
        const userId: string = message.guild.id + "_" + user.id;
        const adapter = new FileSync('Database/db.json');
        const db = low(adapter);


        let UserDb = db.get('user')
            .find({id: userId})
            .value();

        let time: string = args[1];
        let reason = message.content.match(/"([^"]+)"/);

        if (reason === null) {
            reason = "no reason";
        } else {
            reason = reason[1]
        }

        const Usertime = args[1];
        const TimeVariation: string = Usertime[Usertime.length - 1];
        let timeDuration = Usertime.substring(0, Usertime.length - 1);
        timeDuration = parseInt(timeDuration);

        if (isNaN(timeDuration)) {
            this.howToMute(message, Discord);
            return;
        }

        const finalBan = this.dateAdd(new Date, TimeVariation, 1).getTime();

        if (finalBan === undefined) {
            this.howToMute(message, Discord);
            return;
        }

        if (UserDb === undefined) {
            db.get('user').push({
                id: userId,
                server: message.guild.id,
                title: message.author.username,
                warn: 0,
                muted: {
                    "until": finalBan,
                    "reason": reason,
                    "administrator": message.author.username,
                    "explained": 0
                }
            }).write();
            const Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('The user has been muted ! ')
                .setAuthor('Muted  =>' + user.name, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setTimestamp()
                .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

            message.channel.send(Embed);
        } else {
            db.get('user')
                .find({id: userId})
                .assign({
                    muted: {
                        "until": finalBan,
                        "reason": reason,
                        "administrator": message.author.username,
                        "explained": 0
                    }
                })
                .write();

            const Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('The user has been muted ! ')
                .setAuthor('Muted  =>' + user.name, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setTimestamp()
                .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

            message.channel.send(Embed);
        }
    }

    static howToMute(message, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('How to mute ?')
            .setAuthor('Mute', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('You need to know how to mute')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                {name: 'How ?', value: "The command work like that : $mute @user 1d \"insult\" "},
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }

    static dateAdd(date, interval, units) {
        if (!(date instanceof Date))
            return undefined;
        var ret = new Date(date); //don't change original date
        var checkRollover = function () {
            if (ret.getDate() != date.getDate()) ret.setDate(0);
        };
        switch (String(interval).toLowerCase()) {
            case 'y':
                ret.setFullYear(ret.getFullYear() + units);
                checkRollover();
                break;
            case 'q':
                ret.setMonth(ret.getMonth() + 3 * units);
                checkRollover();
                break;
            case 'mo':
                ret.setMonth(ret.getMonth() + units);
                checkRollover();
                break;
            case 'w':
                ret.setDate(ret.getDate() + 7 * units);
                break;
            case 'd':
                ret.setDate(ret.getDate() + units);
                break;
            case 'h':
                ret.setTime(ret.getTime() + units * 3600000);
                break;
            case 'm':
                ret.setTime(ret.getTime() + units * 60000);
                break;
            case 's':
                ret.setTime(ret.getTime() + units * 1000);
                break;
            default:
                ret = undefined;
                break;
        }
        return ret;
    }
}
