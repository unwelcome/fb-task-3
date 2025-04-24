FROM node:22-alpine

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend .

COPY ./frontend ./frontend

EXPOSE 3000 8081 8080

CMD ["npm", "run", "live"]