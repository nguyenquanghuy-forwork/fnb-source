export interface IApiOutputModel {
  success: boolean;
  message?: string | undefined;
  data?: any;
  meta?: any;
}

export class ApiOutputModel implements IApiOutputModel {
  success!: boolean;
  message?: string | undefined;
  data?: any;
  meta?: any;

  constructor(data?: IApiOutputModel) {
    if (data) {
      for (const property in data) {
        if (Object.prototype.hasOwnProperty.call(data, property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.success = _data['success'];
      this.message = _data['message'];
      this.data = _data['data'];
      this.meta = _data['meta'];
    }
  }

  static fromJS(data: any): ApiOutputModel {
    data = typeof data === 'object' ? data : {};
    const result = new ApiOutputModel();
    result.init(data);
    return result;
  }
}
