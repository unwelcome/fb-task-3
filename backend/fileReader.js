import fs from 'fs/promises';

export async function readJSONFromFile(path) {
    try {
        const data = await fs.readFile(path, 'utf8');
        const jsonData = JSON.parse(data);
        return [200, jsonData];
    } catch (err) {
        console.error('Ошибка чтения файла json:', err);
        return [500, { error: 'Ошибка чтения данных' }];
    }
}

export async function writeJSONToFile(path, data) {
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Ошибка записи в файл json:', error);
        return false;
    }
}