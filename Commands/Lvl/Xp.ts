import {Command} from '../../Class/command';
import low = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

export class Xp extends Command {

    static match(message) {
        return message
    }

    static action(message, Discord, bot) {

        const adapter = new FileSync('Database/db.json');
        const db = low(adapter);
        const userId: string = message.guild.id + "_" + message.author.id;

        let User = db.get('user')
            .find({id: userId})
            .value();
        if(User.userXp == undefined){
            User = db.get('user')
                .find({id: userId})
                .assign({
                    userXp: 0,
                    UserLvl: 0,
                })
                .write()
        }
        let xpGained = Math.floor(Math.random() * 50) + 25

        if(User.userXp + xpGained > 500 + ( 500 * User.UserLvl)){
            db.get('user')
                .find({id: userId})
                .assign({
                    userXp: User.userXp + xpGained - (500 + ( 500 * User.UserLvl)) ,
                    UserLvl: User.UserLvl +1,
                })
                .write()
        }else{
            db.get('user')
                .find({id: userId})
                .assign({
                    userXp: User.userXp + xpGained
                })
                .write()
        }
    }

    static ChangeOldUser() {

    }
}
