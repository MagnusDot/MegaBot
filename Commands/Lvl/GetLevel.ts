import {Command} from '../../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class GetLevel extends Command {

    static match(message) {
        return message.content.startsWith('$lvl')
    }

    static action(message, Discord, bot) {

        const adapter = new FileSync('Database/db.json');
        const db = low(adapter);
        const userId: string = message.guild.id + "_" + message.author.id;

        let User = db.get('user')
            .find({id: userId})
            .value();


        let UserLvl = User.UserLvl;
        let percent = Math.floor((User.UserXp / (500 + (500 * User.UserLvl))) * 10)
        let left = (10 - percent)

        let bar = '['

        for (let i = 0; i < percent; i++) {
            bar += '█';
        }
        for (let i = 0; i < left; i++) {
            bar += '-';
        }
        bar += ']';

        const Embed = new Discord.MessageEmbed()
            .setColor('#12E811')
            .setTitle(`CURRENT LEVEL : ${UserLvl}`)
            .setAuthor('Muted  => ', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields({name: 'ProgressBar', value: `${bar}`}, {
                name: 'The Next Level up is in ',
                value: `${(500 + (500 * User.UserLvl)) - User.UserXp} XP`
            },{
                    name: 'The Next Level is :',
                    value: `LVL ${UserLvl+1}`
                }
            )
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);

    }
}
