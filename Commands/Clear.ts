import {Command} from "../Class/command";
import {log} from "util";

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
                this.howToClear(message, Discord);
                return;
            }

            let startDate = new Date();


            const messages = await message.channel.messages.fetch({
                limit: 50,
                before: message.id,
            })

            messages.forEach(async (msg) => {
                if (msg.author.id === user.id){
                    await msg.delete()
                }
            })

           await message.delete()

            let endDate   = new Date();
            let seconds = (endDate.getTime() - startDate.getTime()) / 1000;

            const msg = await message.channel
                .send(`Message(s) have been deleted successfully. It took : ${seconds} seconds`)
                .then((msg) => {
                    msg.delete({timeout: 2000});
                });

        } else {
            if (number < 1 || number > 100) {
                this.howToClear(message, Discord);
                return;
            }

            let startDate = new Date();

            const messages = await message.channel.messages.fetch({
                limit: Math.min(number, 100),
                before: message.id,
            });

            await message.channel.bulkDelete(messages).catch(e => {

                const Embed = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Error")
                    .setAuthor(
                        "MegaBot",
                        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
                    )
                    .setDescription("Help")
                    .setThumbnail(
                        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
                    )
                    .addFields({
                        name: "Error During deletion",
                        value: "We can't delete message older than 14 days",
                    })
                    .setTimestamp()
                    .setFooter(
                        "See you soon !",
                        "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
                    );

                message.channel.send(Embed);
            });



            message.delete();

            let endDate   = new Date();
            let seconds = (endDate.getTime() - startDate.getTime()) / 1000;

            const msg = await message.channel
                .send(`Message(s) have been deleted successfully. It took : ${seconds} seconds`)
                .then((msg) => {
                    msg.delete({timeout: 5000});
                });
        }
    }

    static howToClear(message, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("How many messages do you want to delete?")
            .setAuthor(
                "MegaBot",
                "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
            )
            .setDescription("How to clear ?")
            .setThumbnail(
                "https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png"
            )
            .addFields({
                name: "Clear ?",
                value: "The command work like that : $clear (1~100 | @user) ",
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
