import { FastifyRequest } from 'fastify';

import { initDatabase } from '../../database/initDatabase';

import { createFilterFromRequest } from './createFilterFromRequest';

export const findAppointmentsByRequest = async (request: FastifyRequest) => {
  const { appointmentRepository } = await initDatabase();
  return appointmentRepository.find(
    {
      $and: createFilterFromRequest(request),
    },
    ['therapist']
  );
};
