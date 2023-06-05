import express from 'express';
import OrderController from '~/controllers/OrderController';
import { checkUserInfo, checkIsUser } from '~/middlewares/UserMiddlewares';
import useMiddlewares from '~/utils/useMiddlewares';

const router = express.Router();

const orderController = new OrderController();

const middlewares = {
  '/getOrders': [checkIsUser, checkUserInfo],
};

useMiddlewares(router, middlewares);

router.get('/getOrders', orderController.getOrders);

export default router;
