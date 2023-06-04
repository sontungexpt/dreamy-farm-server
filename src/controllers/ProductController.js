import Product from '~/models/Product';

class ProductController {
  getProductAtCategory = async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.category });
      res.json({ status: 'success', data: products });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err });
    }
  };

  create = async (req, res) => {
    await Product.create({
      name: 'apple',
      image: '',
      category: 'fruit',
      type: [
        {
          name: '100g',
          price: 100,
        },
        {
          name: '200g',
          price: 200,
        },
        {
          name: '300g',
          price: 300,
        },
      ],
      description: "It's an fruit",
      sold: 0,
      status: 'active',
    });
    res.json({ status: 'success', message: 'Create product successfully' });
  };

  show = async (req, res) => {
    try {
      const { slug } = req.params;

      if (!slug) {
        return res.status(404).json({
          status: 'error',
          message: 'Slug is not found',
          required: 'slug',
        });
      }

      const product = await Product.findOne({ slug });
      if (!product) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Product not found' });
      }
      res.json({ status: 'success', message: 'Product found', data: product });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err });
    }
  };
}

export default ProductController;
