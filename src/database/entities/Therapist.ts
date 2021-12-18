/* eslint-disable functional/no-this-expression */
import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { Specialism } from './Specialism';

@Entity()
export class Therapist {
  @PrimaryKey()
  id!: number;

  @Property({ length: 6, defaultRaw: `now()` })
  createdAt!: Date;

  @Property({ length: 6, defaultRaw: `now()` })
  updatedAt!: Date;

  @Property({ columnType: 'text' })
  firstName!: string;

  @Property({ columnType: 'text' })
  lastName!: string;

  @ManyToMany(() => Specialism, 'therapist', { owner: true })
  specialism = new Collection<Specialism>(this);
}
