// import { IncomingMessage, Server, ServerResponse } from 'http';

import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

import { appointmentRoutes } from './routes/appointments';

const server: FastifyInstance = Fastify({
  ajv: {
    customOptions: {
      coerceTypes: 'array',
    },
  },
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
};

server.get('/ping', opts, async () => {
  return { pong: 'it worked!' };
});

server.register(appointmentRoutes);

const start = async () => {
  try {
    await server.listen(3000);

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    console.log(port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
