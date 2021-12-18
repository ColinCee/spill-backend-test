import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { Therapist } from './Therapist';

@Entity()
export class Appointment {
  @PrimaryKey()
  id!: number;

  @Property({ length: 6, defaultRaw: `now()` })
  createdAt!: Date;

  @Property({ length: 6, defaultRaw: `now()` })
  updatedAt!: Date;

  @ManyToOne({
    entity: () => Therapist,
    onUpdateIntegrity: 'cascade',
    index: 'fki_therapist_fk',
  })
  therapist!: Therapist;

  @Property()
  typeId!: number;

  @Property({ length: 6 })
  bookingTime!: Date;
}
