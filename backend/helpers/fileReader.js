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

export async function addJSONToFile(path, data){
    const fileData = await readJSONFromFile(path);
    if(fileData[0] !== 200) return false;

    fileData[1].push(data);

    return writeJSONToFile(path, fileData[1]);
}