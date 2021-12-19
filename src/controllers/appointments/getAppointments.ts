import { FastifyInstance, RouteShorthandOptions } from 'fastify';

import { createApiResponse } from '../../createApiResponse';

import { findAppointmentsByRequest } from './queries';

export const getAppointments = async (fastify: FastifyInstance) => {
  // This defines basic request validation
  const opts: RouteShorthandOptions = {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'number' },
          endDate: { type: 'number' },
          appointmentType: { type: 'string' },
          specialism: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  };

  fastify.get('/appointments', opts, async (request) => {
    console.log(request.query);

    const appointments = await findAppointmentsByRequest(request);
    return createApiResponse(appointments);
  });
};
