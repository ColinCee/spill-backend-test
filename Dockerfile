FROM node:16.13-slim

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app
RUN yarn build


CMD ["node", "build/src/server.js"]
