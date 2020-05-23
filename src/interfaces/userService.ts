import { Model } from 'mongoose';
import { UserInterface } from './user';

export interface UserServiceInterface {
  userModel: Model<UserInterface>;
  fetchFromApi(): Promise<Partial<UserInterface>>;
  save(userDTO: Partial<UserInterface>): Promise<void>;
  getAll(): Promise<UserInterface[]>;
  updateUser(
    id: UserInterface['_id'],
    update: Partial<UserInterface>
  ): Promise<void>;
  login(
    email: UserInterface['email'],
    password: UserInterface['password']
  ): Promise<void>;
  delete(id: UserInterface['_id']): Promise<void>;
}
