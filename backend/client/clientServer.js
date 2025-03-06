import path from 'path';
import express from 'express';
import resolvers from './resolvers.js';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../../frontend');
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');

const app = express();

// Обслуживаем статические файлы из указанной папки
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'pages/client.html'));
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
  console.log('Клиент сервер на GraphQL запущен по адресу http://localhost:', PORT);
});