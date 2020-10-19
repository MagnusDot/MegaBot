# Mega Bot ! 

[![Foo](https://img.shields.io/badge/Online-True-brightgreen)](https://github.com/MagnusDot/MegaBot/)


MegaBot was created to bring together all the possible features of bots existing on discord. We are fed up with hundreds of bots that look alike and populate the same discord server! So we want to create a unique discord bot that brings everything together in security and simplicity!

Install : https://discord.com/api/oauth2/authorize?client_id=746452184777883690&permissions=2147483639&scope=bot

## NEW Features V0.1.7
~~
### Correction 
- Fix Mute delay
- Change the ```$help``` function

# Features 

  - Ping the bot : ```$ping``` ( if you need to see the lag betwwen us)
  - Help : ```$help``` ( if you need this help with the command )
  - Level : ```$lvl``` ( You can check your lvl if the server allow it )
  - Poll : ```$poll "this is a question" "option1,option2,option3" timeout(minutes)``` ( if you need to create poll with result )
  - Server : ```$server``` (Get some information about the server)

  #### ADMINISTRATOR COMMAND
  - Mute user : ```$mute 1d @user``` ( mute user during one day )
  - Unmute User : ```$unmute @user``` ( unmute the user)
  - Clear : ```$clear 50``` (delete last 50 messages)
  - Add React emojy then Role : ```$addRole messageidToReact Emojy @role``` ( init bot reaction when the emojy is fired )
  - Delete Role : ```$deleteRole messageidToReact Emojy```
  - role List : ```$rolelist``` This is a list of every role reaction
  - Configuration : 
      - ```$config lvl (true|false)``` : Enable User level on the current server ! 



### Development

Want to contribute? Great! 
You can open some Issue and explain what do you need in the future ! 

#### installation for developper

Create a file at the root named config.js:

`module.exports = { token : "you're discord token"
}`
then : 

```
$ npm i
$ npm run build-ts
$ npm run start
```
