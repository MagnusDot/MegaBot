import { Command } from '../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");


export class Unmute extends Command {

    static match(message) {
        return message.content.startsWith('$unmute')
    }

    static async action(message, Discord) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        const args = message.content.slice(5).trim().split(' ');        
        if (args.length <= 1) {
            return;
        }
        const user = message.mentions.users.first();
        const userId: string = message.guild.id + "_" + user.id;
        const adapter = new FileSync('Database/db.json');
        const db = low(adapter);


        let role = message.guild.roles.cache.find(r => r.name === "Muted")
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
                        await channel.updateOverwrite(role.id, 
                            {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            }
                        );
                    }

                });
            } catch (e) {
                console.log(e.stack)
            }
        }
        let ObjectUser = message.guild.members.cache.get(user.id);

        if (!ObjectUser.roles.cache.has(role.id)) return message.author.send('This user is not muted');

        db.get('user')
            .find({ id: userId })
            .assign({ muted: {} })
            .write();

        ObjectUser.roles.remove(role)
        ObjectUser.send("You've been Unmuted")

        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('The user has been unmuted ! ')
            .setAuthor(`UnMuted => ${user.username}`, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);

    }
}
