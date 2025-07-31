import { Location } from '@repo/types';
import { IRepository } from '../../types';

export abstract class ILocationRepository extends IRepository<
  Location,
  Pick<Location, 'name' | 'type' | 'province' | 'city' | 'address' | 'contacts' | 'coordinate'>,
  Pick<Location, 'name' | 'type' | 'province' | 'city' | 'address' | 'contacts' | 'coordinate'>
> {}
