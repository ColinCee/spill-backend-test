import { RouteHandlerMethod } from 'fastify';

import { initDatabase } from '../../database/initDatabase';

export const getAppointments: RouteHandlerMethod = async (request, reply) => {
  const { appointmentRepository } = await initDatabase();

  const appointments = await appointmentRepository.findAll({ limit: 10 });
  return {
    data: {
      items: appointments,
    },
  };
};
