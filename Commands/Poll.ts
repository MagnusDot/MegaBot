import { Command } from '../Class/command';

export class Poll extends Command {

    static match(message) {
        return message.content.startsWith('$poll')
    }


    static params(commandLine){
            let doubleDoubleQuote = '<DDQ>' ;
            while( commandLine.indexOf( doubleDoubleQuote ) > -1 ) doubleDoubleQuote += '@' ;
            let noDoubleDoubleQuotes = commandLine.replace( /""/g, doubleDoubleQuote ) ;
            let spaceMarker = '<SP>' ;
            while( commandLine.indexOf( spaceMarker ) > -1 ) spaceMarker += '@' ;
            let noSpacesInQuotes = noDoubleDoubleQuotes.replace( /"([^"]*)"?/g, ( fullMatch, capture ) => {
                return capture.replace( / /g, spaceMarker )
                    .replace( RegExp( doubleDoubleQuote, 'g' ), '"' ) ;
            }) ;
            let mangledParamArray = noSpacesInQuotes.split( / +/ ) ;
            return mangledParamArray.map( ( mangledParam ) => {
                return mangledParam.replace( RegExp( spaceMarker,       'g' ), ' ' )
                    .replace( RegExp( doubleDoubleQuote, 'g' ), ''  ) ;
            });

    }

    static help(message, Discord){
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('How to use ?')
            .setAuthor('$poll', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .setDescription('You need to declare a a new poll ? ')
            .setThumbnail('https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png')
            .addFields(
                { name: 'How to do a poll ? ', value: "The command work like that : \n $poll \"this is a question\" \"option1,option2,option3\" timeout" + " ( minutes )  " },
            )
            .setTimestamp()
            .setFooter('See you soon !', 'https://image.noelshack.com/fichiers/2020/34/7/1598188353-icons8-jason-voorhees-500.png');

        message.channel.send(Embed);
    }



    static action(msg, Discord, bot) {


        const args = msg.content.slice(5).trim();
        let params = this.params(args);
        if(params.length != 3){
            this.help(msg, Discord)
            return;
        }

        let question = params[0]
        let options = params[1];
        let time = parseInt(params[2])

        let emojiList = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣','🔟'];
        let optionsList = options.split(",");

        let optionsText = "";
        for (let i = 0; i < optionsList.length; i++) {
            optionsText += emojiList[i] + " " + optionsList[i] + "\n";
        }

        let embed = new Discord.MessageEmbed()
            .setTitle(question)
            .setDescription(optionsText)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setColor(0xD53C55) // Green: 0x00AE86
            .setTimestamp();

        if (time) {
            embed.setFooter(`The poll has started and will last ${time} minute(s)`);
        } else {
            embed.setFooter(`The poll has started and has no end time`);
        }

        //msg.delete(); // Remove the user's command message

        msg.channel.send({embed}) // Definitely use a 2d array here..
            .then(async function (message) {
                let reactionArray = [];
                for (let i = 0; i < optionsList.length; i++) {
                    reactionArray[i] = await message.react(emojiList[i]);
                }

                if (time) {
                    setTimeout(() => {
                        // Re-fetch the message and get reaction counts
                        message.channel.messages.fetch(message.id)
                            .then(async function (message) {
                                let reactionCountsArray = [];
                                for (let i = 0; i < optionsList.length; i++) {
                                    reactionCountsArray[i] = message.reactions.cache.get(emojiList[i]).count - 1;
                                }

                                // Find winner(s)
                                let max = -Infinity, indexMax = [];
                                for (let i = 0; i < reactionCountsArray.length; ++i)
                                    if (reactionCountsArray[i] > max) max = reactionCountsArray[i], indexMax = [i];
                                    else if (reactionCountsArray[i] === max) indexMax.push(i);

                                // Display winner(s)
                                let winnersText = "";
                                if (reactionCountsArray[indexMax[0]] == 0) {
                                    winnersText = "No one voted!"
                                } else {
                                    for (let i = 0; i < indexMax.length; i++) {
                                        winnersText +=
                                            emojiList[indexMax[i]] + " " + optionsList[indexMax[i]] +
                                            " (" + reactionCountsArray[indexMax[i]] + " vote(s))\n";
                                    }
                                }

                                embed.addField("**Winner(s):**", winnersText);
                                embed.setFooter(`The poll is now closed! It lasted ${time} minute(s)`);
                                embed.setTimestamp();

                                message.edit("", embed);
                            });
                    }, time * 60 * 1000);
                }
            })
    }
}

