import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class DeleteRole extends Command {

    static match(message) {
        return message.content.startsWith('$deleteRole')
    }

    static action(message, Discord, bot) {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
        const adapter = new FileSync('Database/messageRole.json');
        const db = low(adapter);

        const args = message.content.slice(11).trim().split(' ');
        if (args[0] === '' || args.length != 2) {
            this.howtoUse(message, Discord);
            return;
        }

        let getServer = db.get('server')
            .find({serverId: message.guild.id})
            .value();

        if (getServer !== undefined) {

            getServer.messages.map(msg => {
                if (msg.id == args[0]) {
                    msg.reaction = getServer.messages.filter(data => data.id == args[0])[0].reaction.filter(array => array.emojy != args[1]);
                }
            })

            db.get('server')
                .find({serverId: message.guild.id})
                .assign({muted: {}})
                .write();

            const Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('The Emojy role has been deleted !  ')
                .setAuthor('Emojy =>' + args[1], 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setTimestamp()
                .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');
            message.author.send(Embed);


        } else {
            message.author.send("you don't have any role by emojy")
        }

    }

    static howtoUse(message, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('How to use ?')
            .setAuthor('$deleteRole', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('This is how you delete a reaction role')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                {
                    name: 'How to delete a reaction role',
                    value: "The command work like that : $deleteRole messageidToReact Emojy"
                },
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }

}
