import { Command } from '../Class/command';
import { Config } from "./Config";

export class Server extends Command {

    static match(message) {
        return message.content.startsWith('$server');
    }

    static action(message, Discord, bot) {

        Config.VerificationOfExistence(message);

        const serverName = message.channel.guild.name
        const currentChannel = message.channel.name

        const memberCount = message.channel.guild.memberCount;
        let activeMembersCount = 0;

        const presences = message.channel.guild.presences.cache
        presences.forEach(presence => {
            if (presence.status === 'online') {
                activeMembersCount++;
            }
        });

        message.channel.send('Wait..')
            .then(msg => {
                msg.delete();
                return `${msg.createdTimestamp - message.createdTimestamp}ms`
            }).then((latency) => {

                const Embed = new Discord.MessageEmbed()
                    .setColor('#12E811')
                    .setTitle(`--------------`)
                    .setAuthor('Server Info :')
                    .addFields(
                        {
                            name: 'Server name : ',
                            value: serverName
                        },
                        {
                            name: 'Current channel : ',
                            value: currentChannel
                        },
                        {
                            name: 'Members : ',
                            value: memberCount
                        },
                        {
                            name: 'Online members : ',
                            value: activeMembersCount
                        },
                        {
                            name: 'Latency : ',
                            value: latency
                        }
                    )
                    .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                    .setTimestamp()
                    .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');
                message.channel.send(Embed);
            })
    }
}
