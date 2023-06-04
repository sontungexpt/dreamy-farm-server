import express from 'express';
import UserController from '~/controllers/UserController';
import { checkUserInfo, checkIsUser } from '~/middlewares/UserMiddlewares';
import useMiddlewares from '~/utils/useMiddlewares';

const router = express.Router();

const userController = new UserController();

const middlewares = {
  '/userInfos': [checkUserInfo],
  '/feedback': [checkIsUser, checkUserInfo],
  '/updateFavoriteProducts': [checkIsUser, checkUserInfo],
  '/getOrders': [checkIsUser, checkUserInfo],
  '/getFavoriteProducts': [checkIsUser],
};

useMiddlewares(router, middlewares);

router.post('/register', userController.register);

router.post('/forgot-password', userController.forgotPassword);

router.post('/login', userController.login);

router.post('/userInfos', userController.getUserInfos);

router.post('/feedback', userController.feedback);

router.post('/updateFavoriteProducts', userController.updateFavoriteProducts);

router.post('/getFavoriteProducts', userController.getFavoriteProducts);

router.get('/getOrders', userController.getOrders);

export default router;
