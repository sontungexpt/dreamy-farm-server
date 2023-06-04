var slug = require('mongoose-slug-updater');
import mongoose from 'mongoose';

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const Product = new Schema(
  {
    order: [{ type: ObjectId, ref: 'Order', default: null }],
    name: { type: String, reuired: true },
    image: { type: String, default: '' },

    category: { type: String, required: true },

    type: {
      type: Array,
      default: [
        {
          name: '',
          price: 0,
        },
      ],
      required: true,
    },

    // the number of products sold
    sold: { type: Number, default: 0 },

    // the number of products in stock
    inventory: { type: Number, default: 0 },

    // status: stock, out-of-stock, incoming
    status: { type: String, default: 'stock' },

    description: { type: String, default: '' },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);

Product.index({ slug: 1 });

export default mongoose.model('Product', Product);
