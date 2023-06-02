var slug = require('mongoose-slug-updater');
import mongoose from 'mongoose';

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const Product = new Schema(
  {
    order: { type: ObjectId, ref: 'Order', default: null },
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    category: { type: String, default: '' },
    type: {
      type: Array,
      default: [
        {
          name: '',
          price: 0,
        },
      ],
    },
    description: { type: String, default: '' },
    sold: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);

Product.index({ slug: 1 });

export default mongoose.model('Product', Product);
