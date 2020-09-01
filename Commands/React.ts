import low = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")
import {MessageAct} from "../Class/MessageAct";

export class React extends MessageAct {

    static match(message) {
        return message
    }
    static action(reaction, User) {

        const adapter = new FileSync('Database/messageRole.json')
        const db = low(adapter)

        let emojy = reaction.emoji.name;
        let GuildId = reaction.message.guild.id;
        let messageGuild = db.get('server')
            .find({ serverId: GuildId })
            .value()
        if(messageGuild === undefined){
            return;
        }

        messageGuild.messages.map(look => {
            if(look.id == reaction.message.id){
                look.reaction.map(react => {
                    if(react.emojy == emojy){
                        let i = reaction.message.guild.roles.cache.find(e => e.name == "Magnus")
                        try{
                            reaction.message.guild.member(User).roles.add(i);
                        }catch (e){
                            console.log('missing permission')
                        }
                    }
                })
            }
        })
    }
}
