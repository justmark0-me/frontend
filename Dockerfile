FROM node:18-alpine

WORKDIR /app
COPY . /app

RUN npm i
CMD npm start
