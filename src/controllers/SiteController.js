import Product from '~/models/Product';

class SiteController {
  index(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send('index');
    next();
  }

  search = async (req, res) => {
    try {
      const { q, type } = req.query;

      const nameTrim = q.trim();

      const products = await Product.find({
        name: { $regex: nameTrim, $options: 'i' },
      });

      if (products) {
        if (type === 'less') {
          // get 5 first in products
          products = products.slice(0, 5);
        }
        res.json({
          status: 'success',
          message: 'Search success',
          data: products,
        });
      }

      res.json({ status: 'error', message: 'Product not found' });
    } catch (err) {
      res
        .status(404)
        .json({ status: 'error', message: err.message, error: err });
    }
  };
}

export default SiteController;
