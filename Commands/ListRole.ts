import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class ListRole extends Command {

    static match(message) {
        return message.content.startsWith('$rolelist')
    }

    static action(message, Discord, bot) {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
        message.delete();
        const adapter = new FileSync('Database/messageRole.json');
        const db = low(adapter);

        let getServer = db.get('server')
            .find({serverId: message.guild.id})
            .value();

        if (getServer !== undefined) {
            message.author.send("_______ Role By Message Id _______");
            getServer.messages.forEach(msg => {
                let data = [];
                msg.reaction.forEach(reaction => {
                    data.push({name: "emojy :" + reaction.emojy, value: "role :" + reaction.role});
                });
                message.author.send(this.SendList(Discord, data, msg.id));
            })

        } else {
            message.author.send("you don't have any role by emojy")
        }

    }

    static SendList(Discord, data, id) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('List of emojy Role')
            .setAuthor('Message id : ' + id, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('This is all the role by emojy')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                data
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        return Embed;

    }
}
