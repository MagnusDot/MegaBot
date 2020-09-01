export class MessageAct {

    static parse(message, user) {
        if(user.bot) return;

        if (this.match(message)) {
            this.action(message, user);
            return true
        }
        return false
    }

    static match(message) {
        return false
    }

    static action(message, user) {

    }

    static Validated(message,text) {
        message.author.send(text);
    }

}