import { Model } from 'mongoose';
import { UserInterface } from '../interfaces/';
import { fetchUser } from '../utils/fetchUser';
import { UserServiceInterface } from '../interfaces/userService';
import { Gender } from '../enums/gender';
import { HttpBadRequest, HttpInternalServerError } from '../errors/httpErrors';

export default class UserService implements UserServiceInterface {
  userModel: Model<UserInterface>;

  constructor(userModel: Model<UserInterface>) {
    this.userModel = userModel;
  }

  async fetchFromApi(): Promise<Partial<UserInterface>> {
    const { name, email, login, picture, gender } = await fetchUser();

    const userDTO: Partial<UserInterface> = {
      name: name.first,
      email,
      password: login.password,
      picture: picture.large,
      gender: +Gender[gender],
    };

    return userDTO;
  }

  async save(userDTO: Partial<UserInterface>): Promise<void> {
    const user = new this.userModel(userDTO);

    await user.save();
  }

  async getAll(): Promise<UserInterface[]> {
    const users = await this.userModel.find();

    return users;
  }

  async updateUser(
    id: UserInterface['_id'],
    update: Partial<UserInterface>
  ): Promise<void> {
    try {
      let user = await this.userModel.findById(id);
      if (!user) {
        throw new HttpBadRequest(`User with id ${id} doesn't exist`);
      }

      for (const key in update) {
        //@ts-ignore
        user[key] = update[key];
      }

      await user.save();
    } catch (e) {
      throw new HttpBadRequest(e.message);
    }
  }

  async delete(id: UserInterface['_id']): Promise<void> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new HttpBadRequest(`User with id ${id} doesn't exist`);
      }

      await user.update({ removed: true });
    } catch (e) {
      throw new HttpInternalServerError(e.message);
    }
  }

  async login(
    email: UserInterface['email'],
    password: UserInterface['password']
  ): Promise<void> {
    try {
      const user = await this.userModel.findOne({ email }).select('+password');
      if (!user)
        throw new HttpBadRequest(`User with email ${email} doesn't exist`);

      const isMatch = await user.comparePassword(password!);

      if (!isMatch) {
        throw new HttpBadRequest('Wrong password');
      }
    } catch (e) {
      throw new HttpBadRequest(e.message);
    }
  }
}
