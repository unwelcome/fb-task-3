import { WebSocketServer } from 'ws';
import path from 'path';
import { readJSONFromFile, writeJSONToFile, addJSONToFile } from './fileReader.js';
import { fileURLToPath } from 'url';

const PORT = 8081;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatMessagesFile = path.join(__dirname, '..', 'database/chat_messages.json');

const wss = new WebSocketServer({ port: PORT });

const clients = new Set();

wss.on('connection', async(ws) => {
    console.log('Новое подключение');
    clients.add(ws);

    const fileData = await readJSONFromFile(chatMessagesFile);
    if (fileData[0] === 200) ws.send(JSON.stringify(fileData[1]));

    ws.on('message', messageString => {
        const message = JSON.parse(messageString);
        console.log('Получено: ', message);
        const newMessage = {
            "author": message.author,
            "text": message.text,
            "date": message.date
        };

        addJSONToFile(chatMessagesFile, newMessage);

        clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify([newMessage]));
            }
        });
    });

    ws.on('close', () => {
        console.log('Соединение закрыто');
        clients.delete(ws);
    });

    ws.on('error', error => {
        console.error('Ошибка WebSocket:', error);
    });
});

console.log('Сервер WebSocket запущен на порту:', PORT);