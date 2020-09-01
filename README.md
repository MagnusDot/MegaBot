# Mega Bot ! 

MegaBot was created to bring together all the possible features of bots existing on discord. We are fed up with hundreds of bots that look alike and populate the same discord server! So we want to create a unique discord bot that brings everything together in security and simplicity!

Install : https://discord.com/api/oauth2/authorize?client_id=746452184777883690&permissions=8&scope=bot


# New Features! V0.1

  - Mute user : ```$mute 1d @user``` ( mute user during one day )
  - Unmute User : ```$unmute @user``` ( unmute the user)
  - Ping the bot : ```$ping``` ( if you need to see the lag betwwen us)
  - Help : ```$help``` ( if you need this help with the command )
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
