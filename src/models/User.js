import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    status: { type: String, default: 'active' },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

// login.index({ first: 1, last: -1 }) Nơi đánh index
export default mongoose.model('User', User);
