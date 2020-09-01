import { Command } from '../Class/command';

export class Help extends Command {

  static match(message) {
    return message.content.startsWith('$help')
  }
  static action(message, Discord, bot) {


    const Embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('How to use Mega Bot')
      .setAuthor('Mega Bot', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
      .setDescription('You need to know !')
      .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
      .addFields(
        { name: 'Install the bot ', value: "LINK HERE" },
        { name: '```$help```', value: "You can have this overlay to know how to use this bot !" },
        { name: '```$ping```', value: "Are you lagging ? Or I'am ?" },
        { name: '```$mute```', value: "ADMINISTRATOR : \n mute the one you want ! \n ```$mute @user 1d \"insult\"``` " },
        { name: '```$unmute```', value: "ADMINISTRATOR : \n unmute the one you want ! \n ```$unmute @user``` " },
          { name: '```$addRoleReact```', value: "ADMINISTRATOR : \n Add a message to react !  \n ```$addRoleReact messageidToReact``` " },
          { name: '```$addRoleTo```', value: "ADMINISTRATOR : \n Add an emojy => role !  \n ```$addRoleTo messageidToReact Emojy @role``` " },


      )
      .setTimestamp()
      .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');


    message.author.send(Embed);
    message.delete();

  }
}
