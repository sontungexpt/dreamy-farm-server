import productRouter from './product';
import userRouter from './user';
import siteRouter from './site';
import { checkToken, checkUser } from '~/middlewares/UserMiddlewares';

function route(app) {
  app.use('/products', productRouter);

  app.use('/user', checkToken, checkUser, userRouter);

  app.use('/', siteRouter);
}

export default route;
