import Product from '~/models/Product';

class ProductController {
  getProductAtCategory = async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.category });
      res.json({ status: 'success', products });
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
      const product = await Product.findOne({ slug: req.params.slug });
      if (!product) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Product not found' });
      }
      res.json({ status: 'success', message: 'Product found', product });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err });
    }
  };
  // vegetables = async (req, res) => {
  //   const products = await Product.find({ category: 'vegetable' });
  //   res.json({ status: 'success', products });
  // };

  // herbs_aromatics = (req, res) => {
  //   const products = Product.find({ category: 'herb_aromatic' });
  //   res.json({ status: 'success', products });
  // };

  // frozens = (req, res) => {
  //   const products = Product.find({ category: 'frozen' });
  //   res.json({ status: 'success', products });
  // };
  // meats_seafoods = async (req, res) => {
  //   const products = await Product.find({ category: 'meat_seafood' });
  //   res.json({ status: 'success', products });
  // };

  // dairy_eggs = async (req, res) => {
  //   const products = await Product.find({ category: 'meat_seafood' });
  //   res.json({ status: 'success', products });
  // };

  // fruits = async (req, res) => {
  //   const products = await Product.find({ category: 'fruit' });
  //   res.json({ status: 'success', products });
  // };
}

export default ProductController;
