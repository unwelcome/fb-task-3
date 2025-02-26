const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

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
app.get('/cards', (req, res) => {
    const dataFilePath = path.join(__dirname, '..', 'database/cards.json');

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла data.json:', err);
            return res.status(500).json({ error: 'Ошибка чтения данных' });
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            return res.status(500).json({ error: 'Ошибка парсинга данных' });
        }
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log("Main server is running on http://localhost:", PORT);
});