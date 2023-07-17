import 'dotenv/config';

const properties = {
  DB: {
    PORT: process.env.DB_PORT || 27017,
    HOST: process.env.DB_HOST || 'localhost',
    NAME: process.env.DB_NAME || 'dreamy_farm',
  },
  PORT: process.env.RUNNING_PORT || 3001,
  JWT_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret',
};

export default properties;
