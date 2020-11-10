import { Command } from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");
import ms = require("ms");
import { User } from 'discord.js';

export class Mute extends Command {

    static match(message) {
        return message.content.startsWith('$mute')
    }

    static async action(message, Discord, bot) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        const args = message.content.slice(5).trim().split(' ');
        if (args.length < 2) {
            this.howToMute(message, Discord);
            return;
        }
        
        /* find Role muted  */

        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        if (!role) {
            try {
                role = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#000000",
                        permissions: []
                    }
                });

                message.guild.channels.cache.forEach(async (channel) => {
                    if (channel.type === "text") {
                        await channel.overwritePermissions([
                            {
                                id: role.id,
                                deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
                            }
                        ]
                        );
                    }

                });
            } catch (e) {
                console.log(e.stack)
            }
        }


        /* find the user mention  */
        const mentions = message.mentions.users.first();
        if (mentions === undefined) {
            this.howToMute(message, Discord);
            return;
        }

        /* Open database and find User mentionned */
        const userId: string = message.guild.id + "_" + mentions.id;
        const adapter = new FileSync('Database/db.json');
        const db = low(adapter);


        let UserDb = db.get('user')
            .find({ id: userId })
            .value();
        /* Get reason of ban */
        let reason = message.content.match(/"([^"]+)"/);

        if (reason === null) {
            reason = "no reason";
        } else {
            reason = reason[1]
        }
    
        /* get Time user muted */

        const Usertime = ms(args[1]);
        
        if (Usertime === undefined) {
            this.howToMute(message, Discord);
            return;
        }

        let user = message.guild.members.cache.get(mentions.id);


        if (user.roles.cache.has(role.id)) return message.author.send('This user is already muted');

        if (UserDb === undefined) {
            db.get('user').push({
                id: userId,
                server: message.guild.id,
                title: message.author.username,
                warn: 0,
                muted: {
                    "reason": reason,
                    "muted": true
                }
            }).write();
            await (user.roles.add(role)).then(() => {
                setTimeout(function () {
                    user.roles.remove(role)
                    user.send("You've been Unmuted")
                }, Usertime)
            });
            user.send(this.Muted(message, Discord, mentions, Usertime, "You've been muted", reason))

            message.channel.send(this.Muted(message, Discord, mentions, Usertime, "The user has been muted ! ", reason))
        } else {
            db.get('user')
                .find({ id: userId })
                .assign({
                    muted: {
                        "reason": reason,
                        "muted": true
                    }
                })
                .write();
            await (user.roles.add(role)).then(() => {
                setTimeout(function () {
                    user.roles.remove(role)
                    user.send("You've been Unmuted")
                }, Usertime)
            });

            user.send(this.Muted(message, Discord, mentions, Usertime, "You've been muted", reason))

            message.channel.send(this.Muted(message, Discord, mentions, Usertime, "The user has been muted ! ", reason))
        }
        message.delete();
    }

    static howToMute(message, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('How to mute ?')
            .setAuthor('Mute', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('You need to know how to mute')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                { name: 'How ?', value: "The command work like that : $mute @user 1d \"insult\" " },
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
        return
    }

    static Muted(message, Discord, mentions, duration, title, reason) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title)
            .setAuthor('Mute', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('Muted  => ' + mentions.username + '\n During => ' + ms(duration, { long: true }) + '\n Reason => ' + reason, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        return Embed;
    }


}
