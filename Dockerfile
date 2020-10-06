FROM node
WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm build

CMD [ "node", "bot.js" ]


