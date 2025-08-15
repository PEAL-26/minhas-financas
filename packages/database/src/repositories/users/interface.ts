import { User } from '@repo/types/user';
import { IRepository } from '../../types';

export type UserCreateData = Pick<User, 'name' | 'email' | 'passwordHash' | 'providerId'>;

export type UserUpdateData = Partial<UserCreateData>;

export abstract class IUserRepository extends IRepository<User, UserCreateData, UserUpdateData> {}
