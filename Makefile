update: update-git build stop start

stop:
	forever stop bot.js

update-git:
	git pull

build:
	npm run build-ts

start:
	forever start -o out.log bot.js