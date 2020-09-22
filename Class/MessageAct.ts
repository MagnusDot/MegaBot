export abstract class MessageAct {

    static parse(message, user, Discord) {
        if(user.bot) return;

        if (this.match(message)) {
            this.action(message, user, Discord);
            return true
        }
        return false
    }

    static match(message) {
        return false
    }

    static action(message, user, Discord) {

    }

    static Validated(message,text) {
        message.author.send(text);
    }

}