import { AxiosError } from 'axios';
class AxiosException extends Error {
  message: string;
  status: number;
  response: unknown;
  headers: { [key: string]: any };
  result: any;

  constructor(message: string, status: number, response: unknown, headers: { [key: string]: any }, result: any) {
    super();
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }
}

export function isAxiosError(obj: any | undefined): obj is AxiosError {
  return obj && obj.isAxiosError === true;
}

export function throwException(
  message: string,
  status: number,
  response: { message: string } | unknown,
  headers: { [key: string]: any },
  result?: any,
): any {
  if (result !== null && result !== undefined) throw result;
  else {
    let messageError = message;
    if (Object.prototype.hasOwnProperty.call(response, 'message')) {
      // @ts-ignore
      messageError = response?.message || '';
    }
    throw new AxiosException(messageError, status, response, headers, null);
  }
}
