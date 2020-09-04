import {Command} from '../Class/command';

export class ping extends Command {

    static match(message) {
        return message.content.startsWith('$ping')
    }

    static action(message, Discord, bot) {

        message.channel.send("ping ? ").then((msg) => {
            msg.edit(`Pong ! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms`);
        })


    }
}
