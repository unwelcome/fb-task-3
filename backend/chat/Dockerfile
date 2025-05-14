FROM node:23-alpine

WORKDIR /app

COPY ./backend/chat/package*.json ./

RUN npm install

COPY ./backend/chat/ .

COPY ./backend/helpers ./helpers

EXPOSE 8081

CMD ["npm", "run", "live"]