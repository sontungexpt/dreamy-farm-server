import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserInfo = new Schema({
  email: { type: String, unique: true, required: true, maxlength: 255 },
  fullName: { type: String, default: '' },
  addreses: {
    type: Array,
    validate: {
      validator: function (array) {
        return array.every((v) => {
          const addressValidated = typeof v.address === 'string';
          const phoneNumberValidated =
            /\d{3}-\d{3}-\d{4}/.test(v.phoneNumber) || v.phoneNumber === '';
          const addressActiveValidated = typeof v.addressActive === 'number';
          return (
            addressValidated && phoneNumberValidated && addressActiveValidated
          );
        });
      },
      message: (props) => `${props.array} is not a valid address`,
    },
    default: [],
  },
  avatar: { type: String, default: '' },
  favoriteProducts: [{ type: ObjectId, ref: 'Product' }],
});

UserInfo.index({ email: 1 });
export default mongoose.model('UserInfo', UserInfo);
