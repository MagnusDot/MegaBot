import { Command } from "../Class/command";

export class Clear extends Command {
  static match(message) {
    return message.content.startsWith("$clear");
  }

  static async action(message, Discord, bot) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    const args = message.content.split(" ");
    const number = parseInt(args[1]);

    if (isNaN(number)) {
      const user = message.mentions.users.first();
      if (user === undefined) {
        this.howToClearSomeone(message, Discord);
        return;
      }

      const messages = await message.channel.messages.fetch({
        before: message.id,
      });

      messages.forEach(async (msg) =>{
        if(msg.author.id === user.id) await msg.delete();
     })

    } else {
      if (number < 1 || number > 100) {
        this.howToClearNumber(message, Discord);
        return;
      }

      const messages = await message.channel.messages.fetch({
        limit: Math.min(number, 100),
        before: message.id,
      });

      await message.channel.bulkDelete(messages);
    }

    await message.delete();

    const msg = await message.channel
      .send(`Message(s) have been deleted successfully.`)
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  }

  static howToClearNumber(message, Discord) {
    const Embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("How many messages do you want to delete?")
      .setAuthor(
        "Mute",
        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
      )
      .setDescription("Choose a number")
      .setThumbnail(
        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
      )
      .addFields({
        name: "How many ?",
        value: "The command work like that : $clear 1~100 ",
      })
      .setTimestamp()
      .setFooter(
        "See you soon !",
        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
      );

    message.channel.send(Embed);
    return;
  }

  static howToClearSomeone(message, Discord) {
    const Embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Who do you want to delete messages from?")
      .setAuthor(
        "Mute",
        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
      )
      .setDescription("You need to know how")
      .setThumbnail(
        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
      )
      .addFields({
        name: "How ?",
        value: "The command work like that : $clear @user ",
      })
      .setTimestamp()
      .setFooter(
        "See you soon !",
        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
      );

    message.channel.send(Embed);
    return;
  }
}
