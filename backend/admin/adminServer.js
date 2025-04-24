import express from 'express';
import path from 'path';
import { readJSONFromFile, writeJSONToFile } from '../helpers/fileReader.js';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../../frontend');
const dataFilePath = path.join(__dirname, '../../database/cards.json');

// Обслуживаем статические файлы из указанной папки
app.use(express.static(publicDirectoryPath));

// Middleware для парсинга JSON
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'pages/admin.html'));
});

// Получить список карточек
app.get('/cards', async(req, res) => {
    try {
        const fileData = await readJSONFromFile(dataFilePath);

        if (fileData[0] !== 200) res.status(fileData[0]).json(fileData[1]);
        else res.json(fileData[1]);
    } catch (error) {
        console.error("Error reading cards:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// Создать новые карточки
app.post('/card', async(req, res) => {
    try {
        const fileData = await readJSONFromFile(dataFilePath);
        if (fileData[0] !== 200) res.status(fileData[0]).json(fileData[1]);

        let cards = fileData[1];
        let latestCardID = cards[cards.length - 1].id + 1;

        for(let card of req.body){
            const newCard = {
                id: latestCardID++,
                name: card.name,
                categories: card.categories.split(' '),
                price: parseInt(card.price),
                description: card.description
            };
            cards.push(newCard);
        }

        if(writeJSONToFile(dataFilePath, cards)) res.status(201).json({ message: 'Карточка(-и) успешно создана(-ы)!' });
        else res.status(500).json({ message: 'Что-то пошло не так при создании карточки(-ек)!' });

    } catch (error) {
        console.error("Error reading cards:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// Обновить карточку по ID
app.put('/card/:id', async(req, res) => {
    const cardID = parseInt(req.params.id);
    const updatedCardData = req.body;

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
app.delete('/card/:id', async(req, res) => {
    const cardID = parseInt(req.params.id);

    try {
        const fileData = await readJSONFromFile(dataFilePath);
        if (fileData[0] !== 200) res.status(fileData[0]).json(fileData[1]);

        let cards = fileData[1].filter(card => card.id !== cardID);

        if(writeJSONToFile(dataFilePath, cards)) res.status(204).json({ message: 'Карточка успешно удалена' });
        else res.status(500).json({ message: 'Что-то пошло не так при удалении карточки' });

    } catch (error) {
        console.error("Error reading cards:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// Swagger документация
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Card shop API',
            version: '1.0.0',
            description: 'API для управления карточками',
        },
        servers: [
            {
                url: 'http://localhost:' + PORT,
            },
        ],
    },
    apis: [path.join(__dirname, './openapi.yaml')], // укажите путь к файлам с аннотациями
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Запуск сервера
app.listen(PORT, () => {
    console.log("Admin server is running on http://localhost:", PORT);
});