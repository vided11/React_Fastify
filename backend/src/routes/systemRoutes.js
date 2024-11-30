import os from 'os';

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
      return { error: 'Error fetching system information' };
    }
  });
}

export default systemRoutes;