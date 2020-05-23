import { Schema, HookNextFunction, model, Query } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserInterface } from '../interfaces/user';

const UserSchema: Schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v: string) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: 'Must be a Valid email',
    },
  },
  picture: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) =>
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
          v
        ),
      message: 'Must be a Valid url',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  removed: {
    type: Boolean,
    default: false,
    select: false,
  },
});

UserSchema.pre<Query<UserInterface>>('find', function () {
  this.where({ removed: false });
});

UserSchema.pre<UserInterface>('save', function (next: HookNextFunction) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (
  candidate: UserInterface['password']
) {
  try {
    const isMatch = await bcrypt.compare(candidate, this.password);
    return isMatch;
  } catch (e) {
    throw e;
  }
};

export default model<UserInterface>('User', UserSchema);
