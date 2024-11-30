import Fastify from 'fastify';
import cors from '@fastify/cors';
import itemRoutes from './routes/itemRoutes.js';
import systemRoutes from './routes/systemRoutes.js';

const fastify = Fastify({
  logger: true
});

fastify.register(cors, {
  origin: true
});

fastify.register(itemRoutes);
fastify.register(systemRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3001});
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();