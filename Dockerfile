FROM node:current-alpine3.10

WORKDIR /app

COPY ["./app/*", "./"]

RUN npm install && node index.js