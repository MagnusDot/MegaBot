export abstract class Command{

    static parse(message, Discord, bot) {
        if(message.author.bot) return false;

        if (this.match(message)) {
            this.action(message, Discord, bot);
            return true
        }
        return false
    }

    static match(message) {
        return false
    }

    // @ts-ignore
    static action(message, Discord, bot)

}