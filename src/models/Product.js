import mongoose from 'mongoose';
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Product', Product);
