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
                warn: 0,
                muted: {}
            }).write()
        } else {
            if (Object.keys(User.muted).length > 0 && User.muted.until > Date.now()) {
                message.delete();
                if (User.muted.explained === 0) {
                    const Embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Muted')
                        .setAuthor('Muted', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                        .setDescription('You\'ve Been muted by an administrator')
                        .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                        .addFields(
                            {name: 'Reason : ', value: User.muted.reason},
                            {name: '\u200B', value: '\u200B'},
                            {name: 'Muted By : ', value: User.muted.administrator, inline: true},
                        )
                        .addField('You have to wait : ', this.sec2time(User.muted.until - Date.now()), true)
                        .setImage('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                        .setTimestamp()
                        .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

                    message.author.send(Embed);
                    db.get('user')
                        .find({id: userId})
                        .assign({
                            muted: {
                                ...User.muted,
                                "explained": 1
                            }
                        })
                        .write()
                }
            } else if (Object.keys(User.muted).length > 0 && User.muted.until < Date.now()) {
                db.get('user')
                    .find({id: userId})
                    .assign({muted: {}})
                    .write()
            }

        }
    }

    static sec2time(timeInSeconds) {
        var pad = function (num, size) {
                return ('000' + num).slice(size * -1);
            },
            time: any = parseFloat(timeInSeconds).toFixed(3),
            hours: any = Math.floor(time / 60 / 60),
            minute: any = Math.floor(time / 60) % 60,
            seconds: any = Math.floor(time - minute * 60),
            milliseconds = time.slice(-3);

        return pad(hours, 2) + ':' + pad(minute, 2) + ':' + pad(seconds, 2);
    }
}
