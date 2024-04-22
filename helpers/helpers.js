import { promises as fs } from 'fs';
import Jimp from 'jimp';

const isAccessible = (path) =>
    fs.access(path)
        .then(() => true)
        .catch(() => false);

export const setupFolder = async (path) => {
    const folderExist = await isAccessible(path);
    if (!folderExist) {
        try {
            await fs.mkdir(path);
        } catch (e) {
            console.log("no permissions!");
            process.exit(1);
        }
    }
};