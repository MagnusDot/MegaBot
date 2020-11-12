import { Command } from '../../Class/command';
const ytdl = require("ytdl-core");
const search = require('youtube-search');
import * as config from '../../config';
const opts = {
    maxResults: 1,
    key: config.youtube,
    type: "video"
}

export class play extends Command {

    static match(message) {
        return message.content.startsWith('$play')
    }

    static async action(message, Discord, bot, queue) {
        const serverQueue = queue.get(message.guild.id);
        const args = message.content.slice(5).trim();
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

        const songInfo = await search(args, opts);

        const song = {
            title: songInfo.results[0].title,
            url: songInfo.results[0].link,
            user: message.author.username
        };

        if (!serverQueue) {
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            queue.set(message.guild.id, queueContruct);

            queueContruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                this.play(message.guild, queueContruct.songs[0], queue, Discord);
            } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }

    }


    static play(guild, song, queue, Discord) {
        const serverQueue = queue.get(guild.id);
        if (!song) {
            
            const Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`No Song to play, I will leave the channel`)
                .setAuthor(``, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setTimestamp()
            serverQueue.textChannel.send(Embed).then((msg) => {
                msg.delete({ timeout: 5000 });
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
            });
            return;
        }

        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
                serverQueue.songs.shift();
                this.play(guild, serverQueue.songs[0], queue, Discord);
            })
            .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`New Song : **${song.title}** played by ${song.user}`)
            .setAuthor(``, 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setTimestamp()
        serverQueue.textChannel.send(Embed);
    }
}
