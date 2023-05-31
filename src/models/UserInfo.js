import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserInfo = new Schema({
  // Authentication
  email: { type: String, unique: true, required: true, maxlength: 255 },
  roles: [
    {
      type: ObjectId,
      ref: 'Role',
      default: ['user'],
    },
  ],

  // Additional information
  fullname: { type: String, default: '' },
  addreses: [
    {
      city: { type: String, default: '' },
      district: { type: String, default: '' },
      ward: { type: String, default: '' },
      street: { type: String, default: '' },
      status: { type: String, default: 'active' },
    },
  ],
  phone: { type: String, default: '', maxlength: 10, minlength: 10 },
  avatar: { type: String, default: '' },
  favorites: [{ type: ObjectId, ref: 'Product' }],
});

UserInfo.index({ email: 1 });
export default mongoose.model('UserInfo', UserInfo);
