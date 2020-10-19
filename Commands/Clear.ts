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
      return 'Not a Number!';
    }

    if (number < 1 || number > 100)
      return message.reply("Please choose a number between 1 and 100");

    const messages = await message.channel.messages.fetch({
      limit: Math.min(number, 100),
      before: message.id,
    });

    await message.channel.bulkDelete(messages);

    const msg = await message.channel
      .send(`${number} message(s) has been deleted.`)
      .then((msg) => {
        msg.delete({ timeout: 10000 });
      });
  }
}
