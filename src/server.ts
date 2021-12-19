import Fastify, { FastifyInstance } from 'fastify';

import { appointmentRoutes } from './controllers/appointments';

const server: FastifyInstance = Fastify({
  ajv: {
    customOptions: {
      coerceTypes: 'array',
    },
  },
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
