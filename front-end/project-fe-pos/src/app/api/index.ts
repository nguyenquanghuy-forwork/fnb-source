import { env } from '../../env';
import axiosInstance from './axios/AxiosInstance';
import {
  AccountClient,
  ConfigurationClient,
  FacebookClient,
  LoginClient,
  OrderClient,
  ProductClient,
  TikTokShopClient,
  WarehouseClient,
} from './requests';
const baseApiUrl = `${env.BASE_API_URL}`;
const productRequest = new ProductClient(baseApiUrl, axiosInstance);
const loginRequest = new LoginClient(baseApiUrl, axiosInstance);
const tikTokShopRequest = new TikTokShopClient(baseApiUrl, axiosInstance);
const facebookRequest = new FacebookClient(baseApiUrl, axiosInstance);
const accountRegisterRequest = new AccountClient(baseApiUrl, axiosInstance);
const configurationRequest = new ConfigurationClient(baseApiUrl, axiosInstance);
const warehouseRequest = new WarehouseClient(baseApiUrl, axiosInstance);
const orderRequest = new OrderClient(baseApiUrl, axiosInstance);

export {
  accountRegisterRequest, configurationRequest, facebookRequest, loginRequest, orderRequest, productRequest,
  tikTokShopRequest, warehouseRequest
};

