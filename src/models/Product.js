import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
  id: ObjectId,
  name: { type: String, default: 'no name' },
  date: { type: Date, default: Date.now },
  type: { type: Array, default: 'no type' },
  minPrice: { type: Number, default: 0 },
});
