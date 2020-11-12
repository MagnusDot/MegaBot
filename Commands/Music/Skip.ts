import { Command } from '../../Class/command';


export class skip extends Command {

    static match(message) {
        return message.content.startsWith('$skip')
    }

    static async action(message, Discord, bot, queue) {
        const serverQueue = queue.get(message.guild.id);
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.channel.send(
                "You need to be in a voice channel to play music!"
            );
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                "I need the permissions to join and speak in your voice channel!"
            );
        }

        if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");
        serverQueue.connection.dispatcher.end();
    }
}
