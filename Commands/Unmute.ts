import { Command } from '../Class/command';
import low = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")


export class Unmute extends Command {

    static match(message) {
        return message.content.startsWith('$unmute')
    }
    static action(message, Discord, bot) {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return;

      const user = message.mentions.users.first();
      const userId: string = message.guild.id + "_" + user.id;
      const adapter = new FileSync('Database/db.json')
      const db = low(adapter)
      
          db.get('user')
          .find({ id: userId })
          .assign({ muted: {} })
          .write()

    }
}
