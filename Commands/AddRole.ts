import { Command } from '../Class/command';
import low = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")

export class AddRole extends Command {

    static match(message) {
        return message.content.startsWith('$addRoleTo')
    }
    static action(message, Discord, bot) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
        const adapter = new FileSync('Database/messageRole.json')
        const db = low(adapter)

        const args = message.content.slice(10).trim().split(' ');
        if (args[0] === '' || args.length != 3) {
            this.howtoUse(message, Discord);
            return;
        }

        const messageId = args[0];
        const emojy = args[1];
        if(message.mentions.roles.first() === undefined){
            this.howtoUse(message, Discord);
            return;
        }
        const role = message.mentions.roles.first().name;

        let serverDb = db.get('server')
            .find({ serverId: message.guild.id })
            .value()


        if (serverDb === undefined) {
            this.howtoUse(message, Discord)
            return;
        }else{
           let msg = serverDb.messages;
           msg.map( data => {
               if(data.id == messageId){
                   data.reaction.push({emojy: emojy, role: role})
               }
            })
            db.get('server')
                .find({ serverId: message.guild.id })
                .assign({ messages: msg })
                .write()
        }
    }

    static howtoUse(message, Discord){
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('How to use ?')
            .setAuthor('$addRoleTo', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('You need to declare a reaction message before with $addRoleReact')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                { name: 'How to add role react', value: "The command work like that : $addRoleTo messageidToReact Emojy @role " },
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }
}
