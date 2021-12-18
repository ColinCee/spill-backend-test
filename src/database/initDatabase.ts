import { MikroORM } from '@mikro-orm/core';

import mikroConfig from './mikro-orm.config';

const initDatabase = async () => {
  const orm = await MikroORM.init(mikroConfig);

  return {
    orm,
  };
};