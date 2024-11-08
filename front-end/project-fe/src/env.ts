interface CustomEnv {
  [key: string]: string | undefined;
}

declare global {
  interface Window {
    env: CustomEnv;
    fbAsyncInit: any;
    FB: any;
  }
}

const isNodeEnvironment = typeof process !== 'undefined' && typeof process.env !== 'undefined';

const nodeEnv = isNodeEnvironment ? process.env : {};

const browserEnv: CustomEnv = window.env || {};

export const env: { [key: string]: string | undefined } = {
  ...nodeEnv,
  ...browserEnv,
};

export const ENVIRONMENT = {
  Development: 'development',
  Production: 'production',
};
