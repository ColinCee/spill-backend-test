import { FastifyPluginAsync } from 'fastify';

import { getAppointments } from './getAppointments';

export const appointmentRoutes: FastifyPluginAsync = async (fastify) => {
  await getAppointments(fastify);
};
