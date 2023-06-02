import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema(
  {
    user: { type: ObjectId, ref: 'UserInfo' },
    status: { type: String, default: 'pending' },

    // info of order
    paymentMethod: { type: String, default: 'cash' },
    paymentStatus: { type: String, default: 'pending' },
    products: [{ type: ObjectId, ref: 'Product' }],
    price: { type: Number, default: 0 },
    address: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', Order);
