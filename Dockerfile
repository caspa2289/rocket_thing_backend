ARG NODE_VERSION=18
ARG SERVER_PORT=6969

FROM node:$NODE_VERSION-buster as base

WORKDIR /app

FROM base

COPY package.json package.json
RUN npm install

COPY . .

RUN rm -rf /app/.dist/ && npm run build

EXPOSE $SERVER_PORT
CMD [ "node", "/app/.dist/main.js" ]
