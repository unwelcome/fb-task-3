import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readJSONFromFile } from './fileReader.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '..', 'frontend');

// Обслуживаем статические файлы из указанной папки
app.use(express.static(publicDirectoryPath));

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Массив для хранения задач
let tasks = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'pages/index.html'));
});

// Получить список карточек
app.get('/cards', async(req, res) => {
    const dataFilePath = path.join(__dirname, '..', 'database/cards.json');

    try {
        const fileData = await readJSONFromFile(dataFilePath);

        if (fileData[0] !== 200) res.status(fileData[0]).json(fileData[1]);
        else res.json(fileData[1]);
    } catch (error) {
        console.error("Error reading cards:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log("Main server is running on http://localhost:", PORT);
});