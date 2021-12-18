import { FastifyPluginAsync } from 'fastify';

import { getAppointments } from './get';

export const appointmentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/appointments', getAppointments);
};
