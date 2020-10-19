import { Command } from "../Class/command";

export class Clear extends Command {

  static match(message) {
    return message.content.startsWith("$clear");
  }

  static async action(message, Discord, bot) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    const args = message.content.split(' ');
    const number = parseInt(args[1]);

    if (number < 1 || number > 100)
      return message.reply("il faut choisir un nombre entre 1 et 100");

    const messages = await message.channel.messages.fetch({
      limit: Math.min(number, 100),
      before: message.id,
    });

    await message.channel.bulkDelete(messages);

    const msg = await message.channel.send(
      `${number} message(s) ont été supprimé(s).`
    );

    setTimeout(() => {
      message.delete();
      msg.delete();
    }, 2000);
  }
}
