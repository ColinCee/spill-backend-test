import { FastifyInstance, RouteShorthandOptions } from 'fastify';

import { createApiResponse } from '../../createApiResponse';
import { initDatabase } from '../../database/initDatabase';

export const getAppointments = async (fastify: FastifyInstance) => {
  const opts: RouteShorthandOptions = {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'number' },
          endDate: { type: 'number' },
          appointmentType: { type: 'string' },
        },
      },
    },
  };

  fastify.get('/appointments', opts, async (request) => {
    const { startDate, endDate, appointmentType } = request.query as {
      startDate?: number;
      endDate?: number;
      appointmentType?: string;
    };
    const filter = [];

    if (startDate && endDate) {
      // eslint-disable-next-line functional/immutable-data
      filter.push(...byDateRangeFilter(startDate, endDate));
    }

    if (appointmentType) {
      // eslint-disable-next-line functional/immutable-data
      filter.push(byTypeFilter(appointmentType));
    }

    const { appointmentRepository } = await initDatabase();
    const appointments = await appointmentRepository.find(
      {
        $and: filter,
      },
      ['therapist']
    );

    return createApiResponse(appointments);
  });
};

const byDateRangeFilter = (startDate: number, endDate: number) => {
  return [
    { bookingTime: { $gte: new Date(startDate) } },
    { bookingTime: { $lte: new Date(endDate) } },
  ];
};

const byTypeFilter = (type: string) => {
  return {
    type: {
      name: type,
    },
  };
};
