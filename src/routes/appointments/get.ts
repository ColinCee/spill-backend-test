import { FastifyInstance, RouteShorthandOptions } from 'fastify';

import { initDatabase } from '../../database/initDatabase';

export const getAppointments = async (fastify: FastifyInstance) => {
  const opts: RouteShorthandOptions = {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'number' },
          endDate: { type: 'number' },
        },
        required: ['startDate', 'endDate'],
      },
    },
  };

  fastify.get('/appointments', opts, async (request) => {
    const { startDate, endDate } = request.query as {
      startDate: number;
      endDate: number;
    };

    const { appointmentRepository } = await initDatabase();
    const appointments = await appointmentRepository.find({
      $and: [
        { bookingTime: { $gte: new Date(startDate) } },
        { bookingTime: { $lte: new Date(endDate) } },
      ],
    });

    return {
      data: {
        items: appointments,
      },
    };
  });
};
