import path from 'path';
import { fileURLToPath } from 'url';
import { readJSONFromFile } from '../helpers/fileReader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../database/cards.json');
  
const resolvers = {
    Query: {
        products: async () => { // Резолвер для запроса products
            const fileData = await readJSONFromFile(dataFilePath);

            if(fileData[0] === 200) return fileData[1];
            else return [];
        },
        product: async (parent, args) => { // Резолвер для запроса product
            const { id } = args;

            const fileData = await readJSONFromFile(dataFilePath);
            const requiredProduct = fileData[1].find(product => product.id === parseInt(id));

            if(fileData[0] === 200) return requiredProduct;
            else return {message: "Error, idk"};
        },
    },
};

export default resolvers;