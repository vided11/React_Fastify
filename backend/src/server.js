import Fastify from 'fastify';
import cors from '@fastify/cors';
import itemRoutes from './routes/itemRoutes.js';
import systemRoutes from './routes/systemRoutes.js';

const fastify = Fastify({
  logger: {
    level: 'info',
    requestIdLogLabel: 'requestId',
    serializers: {
      req(request) {
        return {
          method: request.method,
          url: request.url,
          hostname: request.hostname,
          remoteAddress: request.ip,
          requestId: request.id
        };
      }
    }
  },
  requestIdHeader: 'x-request-id',
  genReqId: function (request) {
    return request.headers['x-request-id'] || crypto.randomUUID();
  }
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