import { MikroORM } from '@mikro-orm/core';

import { Appointment } from './entities/Appointment';
import mikroConfig from './mikro-orm.config';

export const initDatabase = async () => {
  const orm = await MikroORM.init(mikroConfig);

  return {
    orm,
    appointmentRepository: orm.em.getRepository(Appointment),
  };
};
