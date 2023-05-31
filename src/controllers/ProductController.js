import Product from '~/models/Product';

class ProductController {
  getProductAtCategory = async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json({ status: 'success', products });
  };

  create = async (req, res) => {
    await Product.create({
      name: 'fish',
      image: '',
      category: 'meat_seafood',
      type: [
        {
          name: '100g',
          price: 100,
        },
        {
          name: '200g',
          price: 200,
        },
      ],
      description: "It's an fish",
      sold: 0,
      status: 'active',
    });
  };

  show = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.productId });
    if (!product) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Product not found' });
    }
    res.json({ status: 'success', product });
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
