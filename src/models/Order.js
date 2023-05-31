import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema(
  {
    user: { type: ObjectId, ref: 'UserInfo' },
    products: { type: ObjectId, ref: 'Product' },
    status: { type: String, default: 'pending' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', Order);
