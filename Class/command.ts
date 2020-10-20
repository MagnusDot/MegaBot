export class Command {

    static parse(message, Discord, bot) {
        if(message.author.bot) return;

        if (this.match(message)) {
            this.action(message, Discord, bot);
            return true
        }
        return false
    }

    static match(message) {
        return false
    }

    static action(message, Discord, bot) {

    }

    static Validated(message,text) {
        message.author.send(text);
    }

    static displayWords(words) {
        let str = "";
        for (let i=0;i<words.length;i++) {
            if (i == 0) {
                str += words[i];
            } else if (i < words.length-1) {
                str += ", "+words[i];
            } else {
                str += " and "+words[i];
            }
        }
        if (str == "") {
            str = "nothing";
        }
        return str;
    }

}