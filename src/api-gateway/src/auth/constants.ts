import * as process from 'node:process';

export const jwtConstants = {
  secret: process.env.ANON_KEY,
};
