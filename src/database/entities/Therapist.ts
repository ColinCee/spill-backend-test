import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Therapist {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'date' })
  createdAt!: Date;

  @Property({ columnType: 'date' })
  updatedAt!: Date;

  @Property({ columnType: 'text' })
  name!: string;
}
