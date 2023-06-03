import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Recipe = new Schema(
  {
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    totalTime: { type: String, default: '' },
    steps: {
      type: Array,
      default: [
        {
          step: { type: String, default: '' },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Recipe', Recipe);
