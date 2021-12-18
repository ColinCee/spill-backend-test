/* eslint-disable functional/immutable-data */
import {
  FastifyInstance,
  FastifyRequest,
  RouteShorthandOptions,
} from 'fastify';

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
          specialism: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  };

  fastify.get('/appointments', opts, async (request) => {
    console.log(request.query);

    const { appointmentRepository } = await initDatabase();
    const appointments = await appointmentRepository.find(
      {
        $and: createFilter(request),
      },
      ['therapist']
    );

    return createApiResponse(appointments);
  });
};

const createFilter = (request: FastifyRequest) => {
  const { startDate, endDate, appointmentType, specialism } = request.query as {
    startDate?: number;
    endDate?: number;
    appointmentType?: string;
    specialism: string[];
  };
  const filter = [];

  if (startDate && endDate) {
    filter.push(...byDateRangeFilter(startDate, endDate));
  }

  if (appointmentType) {
    filter.push(byTypeFilter(appointmentType));
  }

  if (specialism) {
    filter.push(bySpecialismFilter(specialism));
  }

  return filter;
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

const bySpecialismFilter = (specialism: string[]) => {
  return {
    therapist: {
      specialism: {
        name: {
          $in: specialism,
        },
      },
    },
  };
};
