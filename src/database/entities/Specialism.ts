import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Specialism {

  @PrimaryKey()
  id!: number;

  @Property({ length: 6, defaultRaw: `now()` })
  createdAt!: Date;

  @Property({ length: 6, defaultRaw: `now()` })
  updatedAt!: Date;

  @Property({ columnType: 'text' })
  name!: string;

}
