import { Command } from '../Class/command';

export class Help extends Command {

    static match(message) {
        return message.content.startsWith('$help')
    }

    static action(message, Discord, bot) {

        let result = [];
        let User = [
            { name: 'Install the bot ', value: "https://magnusdot.github.io/MegaBot/" },
            { name: '```$help```', value: "You can have this overlay to know how to use this bot !" },
            { name: '```$lvl```', value: "You can get your current server lvl" },
            { name: '```$ping```', value: "Are you lagging ? Or I'am ?" },
            { name: '```$poll```', value: "\n Create a poll for everyone  \n ```$poll \"this is a question\" \"option1,option2,option3\" timeout" + "(minutes) ``` " },
            { name: '```$server```', value: "Get some information about the server" },
            { name: "\n MUSIC", value: '__________________________' },
            { name: '```$play name of the song```', value: "Play song in audio channel" },
            { name: '```$skip```', value: "skip to the next song" },
            { name: '```$stop```', value: "stop playing song and leave channel" },
        ];
        let AdminWarning = [{ name: 'ADMINISTRATOR COMMAND', value: "Be an admin ;)" }];
        let Admin = [
            { name: "ADMINISTRATOR COMMAND", value: '__________________________' },
            { name: '```$mute```', value: "\n mute the one you want ! \n ```$mute @user 1d \"insult\"``` " },
            { name: '```$unmute```', value: "\n unmute the one you want ! \n ```$unmute @user``` " },
            { name: '```$clear```', value: "\n how many messages do you want to delete ! \n ```$clear ( 1~100 | @user )``` " },
            { name: '```$addRole```', value: "\n Add an emojy => role to a specific message ! \n ```$addRole messageidToReact Emojy @role``` " },
            { name: '```$deleteRole```', value: "```$deleteRole messageidToReact Emojy```" },
            { name: '```$rolelist```', value: "This is a list of every role reaction" },
            { name: '```$forbid```', value: '\n Forbid a word on your server ! \n ```$forbid "words,to,forbid"``` ' },
            { name: '```$unforbid```', value: 'Unforbid a word on your server ! : ```$unforbid "words,to,unforbid"``` ' },
            { name: '```$listforbid```', value: 'Get the list of you\'re forbidden words ! : ```$listforbid``` ' },
            { name: "\n CONFIG COMMAND", value: '__________________________' },
            { name: '```$config lvl```', value: "\n Enable / Disable lvl update \n ```$config lvl (true|false) ```" }];

        if (message.member.hasPermission('ADMINISTRATOR')) {
            result = User.concat(Admin)
        } else {
            result = User.concat(AdminWarning)
        }

        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('How to use Mega Bot')
            .setAuthor('Mega Bot', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('You need to know !')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(result)
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.author.send(Embed);
        message.delete();

    }
}
