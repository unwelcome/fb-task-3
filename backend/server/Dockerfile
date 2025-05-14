FROM node:23-alpine

WORKDIR /app

COPY ./backend/server/package*.json ./

RUN npm install

COPY ./backend/server/ .

COPY ./frontend ./frontend

COPY ./backend/helpers ./helpers

EXPOSE 3000 8080

CMD ["npm", "run", "live"]