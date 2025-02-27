import express from 'express';
import fs from 'fs';
import path from 'path';
import { readJSONFromFile, writeJSONToFile } from './fileReader.js';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// // Swagger документация
// const swaggerOptions = {
//     swaggerDefinition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Task Management API',
//             version: '1.0.0',
//             description: 'API для управления задачами',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:3000',
//             },
//         ],
//     },
//     apis: ['openapi.yaml'], // укажите путь к файлам с аннотациями
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '..', 'frontend');

// Обслуживаем статические файлы из указанной папки
app.use(express.static(publicDirectoryPath));

// Middleware для парсинга JSON
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'pages/admin.html'));
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

// // Создать новую задачу
// app.post('/tasks', (req, res) => {
//     const { title, completed } = req.body;
//     const newTask = {
//         id: tasks.length + 1,
//         title,
//         completed: completed || false,
//     };
//     tasks.push(newTask);
//     res.status(201).json(newTask);
// });

// // Получить задачу по ID
// app.get('/tasks/:id', (req, res) => {
//     const taskId = parseInt(req.params.id);
//     const task = tasks.find(t => t.id === taskId);
//     if (task) {
//         res.json(task);
//     } else {
//         res.status(404).json({ message: 'Task not found' });
//     }
// });

// Обновить карточку по ID
app.put('/card/:id', async(req, res) => {
    const cardID = parseInt(req.params.id);
    const updatedCardData = req.body;
    const dataFilePath = path.join(__dirname, '..', 'database/cards.json');

    try {
        const fileData = await readJSONFromFile(dataFilePath);
        if (fileData[0] !== 200) res.status(fileData[0]).json(fileData[1]);

        let cards = fileData[1];
        let cardFounded = false;
        for(let i = 0; i < cards.length; i++){
            if(cards[i].id === cardID){
                cardFounded = true;
    
                // Обновляем поля карточки
                cards[i] = {
                    ...cards[i],
                    name: updatedCardData.name,
                    categories: updatedCardData.categories,
                    price: updatedCardData.price,
                    description: updatedCardData.description
                };
                break;
            }
        }
    
        if (!cardFounded) {
            return res.status(404).json({ error: 'Карточка с указанным ID не найдена' });
        }

        if(writeJSONToFile(dataFilePath, cards)) res.json({ message: 'Карточка успешно обновлена' });
        else res.status(500).json({ message: 'Что-то пошло не так при обновлении карточки' });

    } catch (error) {
        console.error("Error reading cards:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// Удалить карточку по ID
app.delete('/card/:id', (req, res) => {
    const cardID = parseInt(req.params.id);
    console.log(`Удаление карточки #${cardID}`);

    const cardsFilePath = path.join(__dirname, '..', 'database/cards.json');

    fs.readFile(cardsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла');
            return res.status(500).json({ error: 'Ошибка чтения данных' });
        }

        try {
            let cards = JSON.parse(data);

            cards = cards.filter(card => card.id !== cardID);

            // Записываем обновленный массив обратно в файл
            fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Ошибка записи в файл');
                    return res.status(500).json({ error: 'Ошибка записи данных' });
                }

                console.log(`Карточка #${cardID} успешно удалена`);
                res.status(204).send();
            });
        } catch (parseError) {
            console.error('Ошибка парсинга JSON');
            return res.status(500).json({ error: 'Ошибка парсинга данных' });
        }
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log("Admin server is running on http://localhost:", PORT);
});