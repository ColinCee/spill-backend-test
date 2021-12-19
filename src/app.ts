import Fastify, { FastifyInstance } from 'fastify';

import { appointmentRoutes } from './controllers/appointments';

export const buildFastify = () => {
  const server: FastifyInstance = Fastify({
    ajv: {
      customOptions: {
        coerceTypes: 'array',
      },
    },
  });

  server.register(appointmentRoutes);

  return server;
};
