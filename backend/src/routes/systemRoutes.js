import os from 'os';
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

async function systemRoutes(fastify, options) {
    fastify.get('/system/info', async (request, reply) => {
        try {
            return {
                platform: os.platform(),
                arch: os.arch(),
                cpus: os.cpus().length,
                totalMemory: os.totalmem(),
                freeMemory: os.freemem()
            };
        } catch (error) {
            console.error('Error fetching system info:', error);
            reply.code(500);
            return {error: 'Error fetching system information'};
        }
    });

    fastify.get('/system/file-content', async (request, reply) => {
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.join(__dirname, '../info.txt');
            const content = await fs.readFile(filePath, 'utf8');
            return {content};
        } catch (error) {
            console.error('Error reading file:', error);
            reply.code(500);
            return {error: 'Error reading file'};
        }
    });
}

export default systemRoutes;