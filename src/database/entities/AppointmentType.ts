import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class AppointmentType {

  @PrimaryKey()
  id!: number;

  @Property({ length: 6, defaultRaw: `now()` })
  createdAt!: Date;

  @Property({ length: 6, defaultRaw: `now()` })
  updatedAt!: Date;

  @Unique({ name: 'name_uq' })
  @Property({ columnType: 'text' })
  name!: string;

}
