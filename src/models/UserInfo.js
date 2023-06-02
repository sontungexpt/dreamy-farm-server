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
  fullName: { type: String, default: '' },

  addreses: [
    {
      type: String,
      default: '',
    },
  ],
  addressActive: { type: Number, default: 0 },

  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /\d{3}-\d{3}-\d{4}/.test(value) || value === '';
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  avatar: { type: String, default: '' },
  favoriteProducts: [{ type: ObjectId, ref: 'Product' }],
});

UserInfo.index({ email: 1 });
export default mongoose.model('UserInfo', UserInfo);
