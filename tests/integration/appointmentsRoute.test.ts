import { instance, mock } from 'ts-mockito';

import { buildFastify } from '../../src/app';
import { findAppointmentsByRequest } from '../../src/controllers/appointments/queries';
import { Appointment } from '../../src/database/entities/Appointment';

jest.mock('../../src/controllers/appointments/queries');

const server = buildFastify();
// These mocks can be replaced with a real database connection
// That can be done by spinning up a docker container running the database
// with test data, but to save time for this tech test we just mock it here
const mockedFindAppointmentsByRequest =
  findAppointmentsByRequest as jest.MockedFunction<
    typeof findAppointmentsByRequest
  >;
const mockedAppointment = mock(Appointment);

describe('get appointments', () => {
  it('should return data', async () => {
    const appointment = instance(mockedAppointment);
    appointment.id = 1;
    mockedFindAppointmentsByRequest.mockResolvedValue([appointment]);

    const response = await server.inject({
      method: 'GET',
      url: '/appointments',
    });

    expect(response.body).toBe('{"data":{"items":[{"id":1}]}}');
  });
});
