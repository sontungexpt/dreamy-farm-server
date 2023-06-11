import Order from '~/models/Order';
import checkParams from '~/utils/checkParams';

class OrderController {
  // [GET] /order/getOrders
  getOrders = async (req, res) => {
    try {
      const userInfo = res.locals._userInfo;
      const orders = await Order.find({ user: userInfo._id });

      if (!orders) {
        return res.json({
          status: 'error',
          message: 'Orders not found',
          data: 'Orders not found',
        });
      }

      res.json({
        status: 'success',
        message: 'Get orders successfully',
        data: orders,
      });
    } catch (error) {
      res.send({ status: 'error', message: error.message, error: error });
    }
  };

  // [POST] /order/createOrder
  createOrder = async (req, res) => {
    try {
      const userInfo = res.locals._userInfo;
      const { products, address, phoneNumber, paymentMethod } = req.body;
      checkParams(
        req.body,
        'products',
        'address',
        'phoneNumber',
        'paymentMethod',
      );

      const order = await Order.create({
        user: userInfo._id,
        products,
        address,
        phoneNumber,
        paymentMethod,
      });

      res.json({
        status: 'success',
        message: 'Create order successfully',
        data: order,
      });
    } catch (error) {
      res.send({ status: 'error', message: error.message, error: error });
    }
  };
}

export default OrderController;
