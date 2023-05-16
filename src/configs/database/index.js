import mongoose from 'mongoose';
import { DB as connectionString } from '~configs';

async function connect() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed');
  }
}

export default { connect };
