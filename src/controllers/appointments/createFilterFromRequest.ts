/* eslint-disable functional/immutable-data */

import { FastifyRequest } from 'fastify';

export const createFilterFromRequest = (request: FastifyRequest) => {
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
    filter.push(...bySpecialismFilter(specialism));
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
  return specialism.map((s) => ({
    therapist: {
      specialism: {
        name: { $eq: s },
      },
    },
  }));
};
