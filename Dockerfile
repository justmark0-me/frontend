FROM node:16-alpine

WORKDIR /app
COPY ./../ /app

RUN ls && sleep 10
RUN npm i
CMD npm start
