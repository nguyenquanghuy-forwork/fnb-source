import { env } from '../../env';
import axiosInstance from './axios/AxiosInstance';
import {
  AccountClient,
  ConfigurationClient,
  FacebookClient,
  LoginClient,
  MaterialClient,
  ProductClient,
  TikTokShopClient,
  UnitClient,
  WarehouseClient
} from './requests';
const baseApiUrl = `${env.BASE_API_URL}`;
const productRequest = new ProductClient(baseApiUrl, axiosInstance);
const loginRequest = new LoginClient(baseApiUrl, axiosInstance);
const tikTokShopRequest = new TikTokShopClient(baseApiUrl, axiosInstance);
const facebookRequest = new FacebookClient(baseApiUrl, axiosInstance);
const accountRegisterRequest = new AccountClient(baseApiUrl, axiosInstance);
const configurationRequest = new ConfigurationClient(baseApiUrl, axiosInstance);
const warehouseRequest = new WarehouseClient(baseApiUrl, axiosInstance);
const unitRequest = new UnitClient(baseApiUrl, axiosInstance)
const materialRequest = new MaterialClient(baseApiUrl, axiosInstance)

export {
  accountRegisterRequest, configurationRequest, facebookRequest, loginRequest, materialRequest, productRequest,
  tikTokShopRequest, unitRequest, warehouseRequest
};

