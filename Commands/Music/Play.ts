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
            const Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('I need Persmission')
                .setDescription(`I need the permissions to join and speak in your voice channel!`)
                .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setTimestamp()
            return message.channel.send(Embed);
        }

        const songInfo = await search(args, opts);

        const song = {
            title: songInfo.results[0].title,
            url: songInfo.results[0].link,
            user: {
                username: message.author.username,
                id: message.author.id
            }
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
            const Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription(`Queued  [${song.title}](${song.url}) [<@${song.user.id}>]`)
                .setTimestamp()
            return message.channel.send(Embed);
        }

    }


    static play(guild, song, queue, Discord) {
        const serverQueue = queue.get(guild.id);
        if (!song) {

            const Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('No song')
                .setDescription(`I will be Disconnected`)
                .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setTimestamp()
            serverQueue.textChannel.send(Embed).then((msg) => {
                msg.delete({ timeout: 5000 });
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
            });
            return;
        }

        if (serverQueue.voiceChannel.members.filter(member => !member.user.bot).size < 1) {

            serverQueue.songs = [];
            serverQueue.voiceChannel.leave();

            const Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Nobody in the room')
                .setDescription(`I will be Disconnected`)
                .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setTimestamp()
            queue.delete(guild.id);

            serverQueue.textChannel.send(Embed).then(msg => {
                msg.delete({ timeout: 5000 });
            })
        } else {

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
                .setTitle('Now playing')
                .setDescription(`[${song.title}](${song.url}) [<@${song.user.id}>]`)
                .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
                .setTimestamp()
            serverQueue.textChannel.send(Embed);
        }
    }
}
