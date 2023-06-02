import express from 'express';
import UserController from '~/controllers/UserController';
const router = express.Router();

const userController = new UserController();

router.post('/register', userController.register);

router.post('/forgot-password', userController.forgotPassword);

router.post('/login', userController.login);

router.post('/userInfos', userController.getUserInfos);

// router.post('/updateUserInfo', userController.updateUserInfo);

router.post('/updateFavoriteProducts', userController.updateFavoriteProducts);

// router.post('/getFavoriteProducts', userController.getFavoriteProducts);

export default router;
