import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';

import { Specialism } from './Specialism';
import { Therapist } from './Therapist';

@Entity()
@Unique({
  name: 'therapist_id_specialism_id_uq',
  properties: ['therapist', 'specialism'],
})
export class TherapistSpecialism {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'date' })
  createdAt!: Date;

  @Property({ columnType: 'date' })
  updatedAt!: Date;

  @OneToOne({ entity: () => Therapist })
  therapist!: Therapist;

  @OneToOne({ entity: () => Specialism, nullable: true })
  specialism?: Specialism;
}
