const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

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

const publicDirectoryPath = path.join(__dirname, '..', 'frontend');

// Обслуживаем статические файлы из указанной папки
app.use(express.static(publicDirectoryPath));

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Массив для хранения задач
let tasks = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'pages/admin.html'));
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

// // Обновить задачу по ID
// app.put('/tasks/:id', (req, res) => {
//     const taskId = parseInt(req.params.id);
//     const task = tasks.find(t => t.id === taskId);
//     if (task) {
//         const { title, completed } = req.body;
//         task.title = title !== undefined ? title : task.title;
//         task.completed = completed !== undefined ? completed : task.completed;
//         res.json(task);
//     } else {
//         res.status(404).json({ message: 'Task not found' });
//     }
// });

// Удалить карточку по ID
app.delete('/card/:id', (req, res) => {
    const cardID = parseInt(req.params.id);
    console.log('delete card#', cardID);

    

    res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log("Admin server is running on http://localhost:", PORT);
});