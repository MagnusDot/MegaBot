import { Command } from '../../Class/command';


export class Stop extends Command {

    static match(message) {
        return message.content.startsWith('$stop')
    }

    static async action(message, Discord, bot, queue) {
        const serverQueue = queue.get(message.guild.id);
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.channel.send(
                "You need to be in a voice channel to play music!"
            );
            message.react(':wave:')
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
    }
}
