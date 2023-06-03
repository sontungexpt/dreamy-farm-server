import Product from '~/models/Product';

class SiteController {
  index(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send('index');
    next();
  }

  search = async (req, res) => {
    try {
      const { name, type } = req.query;
      const products = await Product.find({ name });
      if (products) {
        if (type === 'less') {
          products = products.splice(0, 5);
        }
        products = products.splice(0, 10);
        res.json({ status: 'success', data: products });
      }
      res.status(404).json({ status: 'error', message: 'Product not found' });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err });
    }
  };
}

export default SiteController;
