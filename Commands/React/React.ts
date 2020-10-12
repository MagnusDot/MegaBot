import low = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")
import {MessageAct} from "../../Class/MessageAct";
import {log} from "util";

export class React extends MessageAct {

    static match(message) {
        return message
    }

    static Alert(role, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('A new role has been added to you')
            .setAuthor('MegaBot', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                {name: 'Your new role is', value: role},
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        return Embed;
    }

    static action(reaction, User, Discord) {
        const adapter = new FileSync('Database/messageRole.json')
        const db = low(adapter)

        let emojy = reaction.emoji.name;
        let GuildId = reaction.message.guild.id;
        let messageGuild = db.get('server')
            .find({serverId: GuildId})
            .value()
        if (messageGuild === undefined) {
            return;
        }
            messageGuild.messages.map(look => {
                if (look.id == reaction.message.id) {
                    look.reaction.map(react => {
                        if (react.emojy == emojy) {
                            let i = reaction.message.guild.roles.cache.find(e => e.name == react.role)
                                reaction.message.guild.member(User).roles.add(i).then(T => {
                                    reaction.message.guild.member(User).send(this.Alert(react.role, Discord))
                                }, e =>{
                                    const Embed = new Discord.MessageEmbed()
                                        .setColor('#fa0000')
                                        .setTitle('ERROR')
                                        .setAuthor('MegaBot', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                                        .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                                        .addFields(
                                            {name: 'THIS BOT DOESN\'T HAVE THE PERMISSION', value: "place the bot's role above others"},
                                        )
                                        .setTimestamp()
                                        .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');
                                    reaction.message.guild.member(User).send(Embed)
                                })
                        }
                    })
                }
            })
    }
}
