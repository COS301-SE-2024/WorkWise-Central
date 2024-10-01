export const GlobalModuleProvider = {
  provide: 'GLOBAL_CONFIG',
  useFactory: () => {
    return {
      serverUrl: process.env.NEST_BACKEND_ENVIRONMENT == 'dev' ? process.env.NEST_DEV_URL : process.env.NEST_PROD_URL,
      frontendUrl:
        process.env.NEST_BACKEND_ENVIRONMENT == 'dev'
          ? process.env.NEST_ROOT_APPLICATION_DEV
          : process.env.NEST_ROOT_APPLICATION_PROD,
      aws_key: process.env.AWS_ACCESS_KEY,
      aws_secret: process.env.AWS_SECRET_ACCESS_KEY,
    };
  },
};
