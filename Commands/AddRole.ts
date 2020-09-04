import {Command} from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class AddRole extends Command {

    static match(message) {
        return message.content.startsWith('$addRole')
    }

    static action(message, Discord, bot) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
        const adapter = new FileSync('Database/messageRole.json');
        const db = low(adapter);

        const args = message.content.slice(10).trim().split(' ');
        if (args[0] === '' || args.length != 3) {
            this.howtoUse(message, Discord);
            return;
        }

        const messageId = args[0];
        const emojy = args[1];


        /**
         * test message creator before
         */

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;

        let getServer = db.get('server')
            .find({serverId: message.guild.id})
            .value();

        if (getServer === undefined) {
            db.get('server').push({
                serverId: message.guild.id,
                messages: [
                    {
                        id: args[0],
                        reaction: []
                    }
                ]
            }).write();
        } else {

            let already: Boolean = false;
            getServer.messages.map(verify => {
                if (verify.id === args[0]) {
                    already = true;
                }
            });
            if (already !== true) {
                getServer.messages.push({
                    id: args[0],
                    reaction: []
                });

                db.get('server')
                    .find({serverId: message.guild.id})
                    .assign({messages: getServer.messages})
                    .write()
            }
        }

        /**
         * end test
         */


        if (message.mentions.roles.first() === undefined) {
            this.howtoUse(message, Discord);
            return;
        }
        const role = message.mentions.roles.first().name;

        let serverDb = db.get('server')
            .find({serverId: message.guild.id})
            .value();


        if (serverDb === undefined) {
            this.howtoUse(message, Discord);
            return;
        } else {
            let msg = serverDb.messages;
            msg.map(data => {
                if (data.id == messageId) {
                    let verify: Boolean = false;
                    data.reaction.map(rea => {
                        if (rea.emojy == emojy) {
                            verify = true;
                        }
                    });
                    if (verify != true) {
                        data.reaction.push({emojy: emojy, role: role});

                        const Embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('The reaction role has been added')
                            .setAuthor('Added ' + emojy + "=>" + role, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                            .setTimestamp()
                            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

                        message.author.send(Embed);
                    } else {
                        const Embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('The emojy is already Used')
                            .setAuthor('$addRoleTo', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                            .setDescription('The emojy is already Used with the message ! ')
                            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                            .setTimestamp()
                            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

                        message.author.send(Embed);
                    }
                }
            });
            db.get('server')
                .find({serverId: message.guild.id})
                .assign({messages: msg})
                .write()
        }
    }

    static howtoUse(message, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('How to use ?')
            .setAuthor('$addRole', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('This is how you assign a role to an user by a reaction')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                {
                    name: 'How to add role react',
                    value: "The command work like that : $addRole messageidToReact Emojy @role "
                },
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }
}
