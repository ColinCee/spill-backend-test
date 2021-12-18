import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { Therapist } from './Therapist';

@Entity()
export class Appointment {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'date' })
  createdAt!: Date;

  @Property({ columnType: 'date' })
  updatedAt!: Date;

  @ManyToOne({ entity: () => Therapist, index: 'fki_therapist_fk' })
  therapist!: Therapist;

  @Property()
  typeId!: number;
}
