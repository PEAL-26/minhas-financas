import { Location } from '@repo/types/location';
import { IRepository } from '../../types';

export abstract class ILocationRepository extends IRepository<
  Location,
  Pick<Location, 'name' | 'type' | 'province' | 'city' | 'address' | 'contacts' | 'coordinate'>,
  Pick<Location, 'name' | 'type' | 'province' | 'city' | 'address' | 'contacts' | 'coordinate'>
> {}
