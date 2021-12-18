import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class AppointmentType {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'date' })
  createdAt!: Date;

  @Property({ columnType: 'date' })
  updatedAt!: Date;

  @Unique({ name: 'name_uq' })
  @Property({ columnType: 'text' })
  name!: string;
}
