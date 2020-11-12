export class Command {

    static parse(message, Discord, bot, queue ) {
        if(message.author.bot) return;

        if (this.match(message)) {
            this.action(message, Discord, bot, queue );
            return true
        }
        return false
    }

    static match(message) {
        return false
    }

    static action(message, Discord, bot, queue) {

    }

    static Validated(message,text) {
        message.author.send(text);
    }

}