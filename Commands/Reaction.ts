import { Command } from '../Class/command';
import low = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")


export class Reaction extends Command {

    static match(message) {
        return message.content.startsWith('$addRoleReact')
    }
    static action(message, Discord, bot) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
        const adapter = new FileSync('Database/messageRole.json')
        const db = low(adapter)

        const args = message.content.slice(13).trim().split(' ');
        if (args[0] === '') {
            this.howtoUse(message, Discord);
            return;
        }

        let serverDb = db.get('server')
            .find({ serverId: message.guild.id })
            .value()

        if (serverDb === undefined) {
            console.log("push")
            db.get('server').push({
                serverId : message.guild.id,
                messages : [
                    {
                        id: args[0],
                        reaction : []
                    }
                ]
            }).write();
        }else{


            serverDb.messages.push({
                id: args[0],
                reaction : []
            });

            db.get('server')
                .find({ serverId: message.guild.id })
                .assign({ messages: serverDb.messages })
                .write()
        }

    }

    static howtoUse(message, Discord){
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('How to use ?')
            .setAuthor('$addRoleTo', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                { name: 'How to add declare message react', value: "The command work like that : $addRoleReact messageidToReact" },
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }
}
