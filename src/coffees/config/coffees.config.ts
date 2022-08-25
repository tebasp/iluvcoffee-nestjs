import { registerAs } from '@nestjs/config';

export default registerAs('coffees', () => ({
  PORT: process.env.DATABASE_PORT,
}));
