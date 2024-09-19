import * as process from 'node:process';

export const paymentGatewayConstants = {
  secret: `${process.env.PAY_KEY}`,
};
