update: update-git install build stop start

stop:
	forever stop bot.js

update-git:
	git pull

build:
	npm run build

start:
	forever start -o out.log bot.js

install:
	npm install