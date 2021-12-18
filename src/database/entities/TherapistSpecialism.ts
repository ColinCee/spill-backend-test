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

  @Property({ length: 6, defaultRaw: `now()` })
  createdAt!: Date;

  @Property({ length: 6, defaultRaw: `now()` })
  updatedAt!: Date;

  @OneToOne({ entity: () => Therapist, onUpdateIntegrity: 'cascade' })
  therapist!: Therapist;

  @OneToOne({
    entity: () => Specialism,
    onUpdateIntegrity: 'cascade',
    onDelete: 'set null',
    nullable: true,
  })
  specialism?: Specialism;
}
