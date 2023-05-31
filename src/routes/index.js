import productRouter from './product';
import userRouter from './user';
import siteRouter from './site';

function route(app) {
  app.use('/products', productRouter);

  app.use('/user', userRouter);

  app.use('/', siteRouter);
}

export default route;
