import { Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  gender: number;
  email: string;
  picture: string;
  password?: string;
  comparePassword: (password: string) => Promise<boolean>;
}
