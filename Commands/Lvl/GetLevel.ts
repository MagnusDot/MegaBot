import {Command} from '../../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");
import {Config} from "../Config";

export class GetLevel extends Command {

    static match(message) {
        return message.content.startsWith('$lvl')
    }

    static action(message, Discord, bot) {

        Config.VerificationOfExistence(message)

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
            .setAuthor('MEGABOT', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields({name: 'ProgressBar', value: `${User.UserLvl} - ${bar} - ${User.UserLvl +1}`}, {
                name: 'The Next Level up is in ',
                value: `${(500 + (500 * User.UserLvl)) - User.UserXp} XP`
            }
            )
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);

    }
}
