/* eslint-disable functional/no-this-expression */
import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { Therapist } from './Therapist';

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

  @ManyToMany(() => Therapist, (therapist) => therapist.specialism)
  therapist = new Collection<Therapist>(this);
}
