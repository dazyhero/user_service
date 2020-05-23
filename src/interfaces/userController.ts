import { UserServiceInterface } from './userService';
import { UserInterface } from './user';

export interface UserControllerInterface {
  userService: UserServiceInterface;
  generate(): Promise<void>;
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
