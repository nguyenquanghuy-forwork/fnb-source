import { LOGIN, PLATFORM_ID } from '@/contants/string.constants';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import { ApiOutputModel } from './../types';
import { isAxiosError, throwException } from './AxiosException';

export function getUrlGet(url: string, data: unknown): string {
  let rs = `${url}`;
  if (data) {
    for (const property in data) {
      if (Object.prototype.hasOwnProperty.call(data, property)) {
        rs = rs.replace(`{${property}}`, (data as any)[property] as string);
      }
    }
  }
  return rs;
}
export function paramsToUrl(data: any): string {
  const params = [];
  if (data) {
    for (const property in data) {
      if (Object.prototype.hasOwnProperty.call(data, property)) {
        params.push(`${property}=${data[property] as string}`);
      }
    }
  }
  return params.length > 0 ? `?${params.join('&')}` : '';
}

export function paramsToUrlWithRemovingEmptyCondition(data: any): string {
  const params = [];
  if (data) {
    for (const property in data) {
      if (Object.prototype.hasOwnProperty.call(data, property)) {
        if (typeof data[property] === 'string' || typeof data[property] === 'number') {
          params.push(`${property}=${data[property] as string}`);
        }
      }
    }
  }
  return params.length > 0 ? `?${params.join('&')}` : '';
}

export default class AxiosClient {
  private instance: AxiosInstance;
  private readonly baseUrl: string;
  private storeId = localStorage.getItem('storeId');
  constructor(baseUrl?: string, instance?: AxiosInstance) {
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : 'USE_ENVIRONMENT_VARIABLE';
  }
  setToken(token: string) {
    if (!this.instance.defaults.headers.common['Authorization']) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
  post(url: string, data: any, cancelToken?: CancelToken | undefined) {
    if (process.env.NODE_ENV === 'development') {
      console.log('domain: ', this.baseUrl);
    }
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset();
    const options_ = {
      method: 'POST',
      url: `${this.baseUrl}/${url}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-TIMEZONE-OFFSET': timezoneOffset,
        'platform-id': PLATFORM_ID,
        'Store-Id': this.storeId,
      },
      cancelToken: cancelToken,
    } as AxiosRequestConfig;
    if (data !== null) {
      options_.data = JSON.stringify(data);
    }
    // Bug: 49050 and 52096
    if (url.includes(LOGIN)) {
      delete this.instance.defaults.headers.common['Authorization'];
    }
    return this.instance
      .request(options_)
      .catch((_error: any) => {
        return _error;
      })
      .then((response: AxiosResponse) => {
        const status = response.status;
        const _headers: { [key: string]: any } = {};
        if (response.headers && typeof response.headers === 'object') {
          for (const k in response.headers) {
            if (Object.prototype.hasOwnProperty.call(response.headers, k)) {
              _headers[k] = response.headers[k];
            }
          }
        }

        if (status === 200) return ApiOutputModel.fromJS(response);
        else if (status !== 200 && status !== 204) {
          const _responseText = response?.data?.error?.message || '';
          const errorResponse: ApiOutputModel = {
            success: false,
            message: _responseText,
            init: function (): void {
              throw new Error('Function not implemented.');
            },
          };
          return ApiOutputModel.fromJS(errorResponse);
        }

        return Promise.resolve(null);
      });
  }

  get(url: string, data: any, cancelToken?: CancelToken | undefined) {
    const url_ = `${this.baseUrl}/${getUrlGet(url, data)}`;
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset();
    const options_ = {
      ...this.instance.defaults.headers.common,
      method: 'GET',
      url: url_,
      headers: {
        Accept: 'application/json',
        'X-TIMEZONE-OFFSET': timezoneOffset,
        'platform-id': PLATFORM_ID,
        'Store-Id': this.storeId,
      },
      cancelToken,
    } as AxiosRequestConfig;
    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((response: AxiosResponse) => {
        const status = response.status;
        const _headers: { [key: string]: any } = {};
        if (response.headers && typeof response.headers === 'object') {
          for (const k in response.headers) {
            if (Object.prototype.hasOwnProperty.call(response.headers, k)) {
              _headers[k] = response.headers[k];
            }
          }
        }
        if (status === 200) {
          return ApiOutputModel.fromJS(response);
        } else if (status === 400) {
          const _responseText = response.data;
          throwException('A server side error occurred.', status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
          const _responseText = response.data;
          throwException('An unexpected server error occurred.', status, _responseText, _headers);
        }
        return Promise.resolve(null);
      });
  }

  put(url: string, data: any, cancelToken?: CancelToken | undefined) {
    if (process.env.NODE_ENV === 'development') {
      console.log('domain: ', this.baseUrl);
    }
    const options_ = {
      method: 'PUT',
      url: `${this.baseUrl}/${url}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'platform-id': PLATFORM_ID,
        'Store-Id': this.storeId,
      },
      cancelToken: cancelToken,
    } as AxiosRequestConfig;
    if (data !== null) {
      options_.data = JSON.stringify(data);
    }
    return this.instance
      .request(options_)
      .catch((_error: any) => {
        return _error;
      })
      .then((response: AxiosResponse) => {
        const status = response.status;
        const _headers: { [key: string]: any } = {};
        if (response.headers && typeof response.headers === 'object') {
          for (const k in response.headers) {
            if (Object.prototype.hasOwnProperty.call(response.headers, k)) {
              _headers[k] = response.headers[k];
            }
          }
        }

        if (status === 200) return ApiOutputModel.fromJS(response);
        else if (status !== 200 && status !== 204) {
          const _responseText = response?.data?.error?.message || '';
          const errorResponse: ApiOutputModel = {
            success: false,
            message: _responseText,
            init: function (): void {
              throw new Error('Function not implemented.');
            },
          };
          return ApiOutputModel.fromJS(errorResponse);
        }

        return Promise.resolve(null);
      });
  }
}
