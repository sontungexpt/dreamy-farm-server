import Product from '~/models/Product';

function initialProducts() {
  new Product({
    name: 'Product 1',
    price: 10,
    category: 'fruit',

    types: [
      {
        name: '100g',
        price: 100,
      },
      {
        name: '200g',
        price: 200,
      },
    ],
    description: 'Description 1',
  }).save();

  new Product({
    name: 'Product 2',
    category: 'fruit',
    types: [
      {
        name: '100g',
        price: 100,
      },
      {
        name: '200g',
        price: 200,
      },
    ],
    price: 20,
    description: 'Description 2',
  }).save();

  new Product({
    name: 'Product 3',
    category: 'fruit',
    types: [
      {
        name: '100g',
        price: 100,
      },
      {
        name: '200g',
        price: 200,
      },
    ],
    price: 30,
    description: 'Description 3',
  }).save();

  new Product({
    name: 'Product 4',
    category: 'fruit',
    types: [
      {
        name: '100g',
        price: 100,
      },
      {
        name: '200g',
        price: 200,
      },
      {
        name: '400g',
        price: 400,
      },
      {
        name: '500g',
        price: 500,
      },
    ],
    price: 40,
    description: 'Description 4',
  }).save();

  new Product({
    types: [
      {
        name: '100g',
        price: 100,
      },
      {
        name: '200g',
        price: 200,
      },
    ],
    name: 'Product 5',
    price: 50,
    category: 'fruit',
    description: 'Description 5',
  }).save();
}

export default initialProducts;
