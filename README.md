# Mega Bot ! 

MegaBot was created to bring together all the possible features of bots existing on discord. We are fed up with hundreds of bots that look alike and populate the same discord server! So we want to create a unique discord bot that brings everything together in security and simplicity!

Install : https://discord.com/api/oauth2/authorize?client_id=746452184777883690&permissions=8&scope=bot


# New Features! V0.1.1
-
- Make a poll : $poll "this is a question" "option1,option2,option3" 1 ( time in minutes )  ( Make a poll for everything ! )
- Create notification for each action your making ! 

## Correction 
- now you can't have conflict with multiple message id

# Features 

  - Ping the bot : ```$ping``` ( if you need to see the lag betwwen us)
  - Help : ```$help``` ( if you need this help with the command )
  - Poll : ```$poll "this is a question" "option1,option2,option3" timeout(minutes)``` ( if you need to create poll with result )
  - Mute user : ```$mute 1d @user``` ( mute user during one day )
  - Unmute User : ```$unmute @user``` ( unmute the user)
  - Add React Message base : ```$addRoleReact messageidToReact``` ( Needed to init the message reaction base)
  - Add React emojy then Role : ```$addRoleTo messageidToReact Emojy @role``` ( init bot reaction when the emojy is fired )


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
$ npm run start```
