import { Router } from 'express';
import UserController from '../controllers/user';
import UserService from '../services/user';
import UserModel from '../models/user';
import { HttpBadRequest, HttpInternalServerError } from '../errors/httpErrors';
import { catchAsync } from '../middlewares/errorHandlers';

const userService = new UserService(UserModel);

const userController = new UserController(userService);

const router = Router();

router.get(
  '/users',
  catchAsync(async (req, res) => {
    const users = await userController.getAll();
    res.status(200).json(users);
  })
);

router.get(
  '/users/generate',
  catchAsync(async (req, res, next) => {
    await userController.generate();
    res.status(200).json({ message: 'User has been successfully generated' });
  })
);

router.put(
  '/users',
  catchAsync(async (req, res) => {
    const { id } = req.query;
    const update = req.body;
    await userController.userService.updateUser(id, update);
    res.status(200).json({ message: 'User has been successfully updated' });
  })
);

router.post(
  '/users/login',
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    await userController.login(email, password);

    res.status(200).json({ message: 'Successfully logged in' });
  })
);

router.delete(
  '/users',
  catchAsync(async (req, res) => {
    const { id } = req.query;

    await userController.delete(id);

    res.status(200).json({ message: `Successfully deleted user ${id} ` });
  })
);

export { router as users };
