import { Gender } from '../enums/gender';

export interface ApiUser {
  gender: Gender;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login: {
    password: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
