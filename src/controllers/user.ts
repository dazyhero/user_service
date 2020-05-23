import { UserControllerInterface, UserInterface } from '../interfaces';
import { UserServiceInterface } from '../interfaces/userService';

export default class UserController implements UserControllerInterface {
  userService: UserServiceInterface;

  constructor(userService: UserServiceInterface) {
    this.userService = userService;
  }

  async generate(): Promise<void> {
    const userDTO = await this.userService.fetchFromApi();

    await this.userService.save(userDTO);
  }

  async getAll(): Promise<UserInterface[]> {
    const users = await this.userService.getAll();

    return users;
  }

  async updateUser(
    id: UserInterface['_id'],
    update: Partial<UserInterface>
  ): Promise<void> {
    await this.userService.updateUser(id, update);
  }

  async login(
    email: UserInterface['email'],
    password: UserInterface['password']
  ): Promise<void> {
    await this.userService.login(email, password);
  }

  async delete(id: UserInterface['_id']): Promise<void> {
    await this.userService.delete(id);
  }
}
