import { FastifyInstance } from 'fastify';
import { instance, mock } from 'ts-mockito';

import { getAppointments } from '../../../src/controllers/appointments/getAppointments';

jest.mock('fastify');

const mockedFastify = mock<FastifyInstance>();
const mockedFastifyInstance = instance(mockedFastify);

describe('getAppointments', () => {
  it('sets up the correct route', async () => {
    mockedFastifyInstance.get = jest.fn();
    await getAppointments(mockedFastifyInstance);

    expect(mockedFastifyInstance.get).toHaveBeenCalledWith(
      '/appointments',
      {
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
      },
      expect.any(Function)
    );
  });
});
