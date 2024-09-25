export const GlobalModuleProvider = {
  provide: 'GLOBAL_SERVER_URL',
  useFactory: () => {
    return process.env.ENVIRONMENT ? process.env.DEV_URL : process.env.PROD_URL;
  },
};
