import * as dotenv from 'dotenv';
import { ConfigDto } from './config.dto';

dotenv.config({ path: './env/.env' });

const config: ConfigDto = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
