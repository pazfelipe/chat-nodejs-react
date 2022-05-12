FROM node:16

WORKDIR /opt/app

COPY ./package.json .

RUN npm install

COPY . .

RUN chown -R node:node /opt/app

CMD ["npm", "run", "start"]