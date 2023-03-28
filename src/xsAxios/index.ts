import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInterceptorOptions,
} from 'axios';

type TInterceptor<V = any> = [
  (_value: V) => V | Promise<V>,
  ((_error: any) => any) | null,
  AxiosInterceptorOptions | undefined,
];

export type TRequestInterceptor = TInterceptor<InternalAxiosRequestConfig>;
export type TResponseInterceptor = TInterceptor<AxiosResponse>;

export class XsAxios {
  private _instance: AxiosInstance;
  private _requestInterceptorId: number | undefined;
  private _responseInterceptorId: number | undefined;
  private _requestInterceptor: TRequestInterceptor | undefined;
  private _responseInterceptor: TResponseInterceptor | undefined;
  constructor(
    options: CreateAxiosDefaults & {
      requestInterceptor?: TRequestInterceptor;
      responseInterceptor?: TResponseInterceptor;
    },
  ) {
    const { requestInterceptor = undefined, responseInterceptor = undefined, ...axiosOptions } = options;
    this._instance = axios.create(axiosOptions);
    if (requestInterceptor) {
      this._requestInterceptor = requestInterceptor;
      this._requestInterceptorId = this._instance.interceptors.request.use(...this._requestInterceptor);
    }
    if (responseInterceptor) {
      this._responseInterceptor = responseInterceptor;
      this._responseInterceptorId = this._instance.interceptors.response.use(...this._responseInterceptor);
    }
  }
  get instance() {
    return this._instance;
  }
  private transformSendData<T extends object>(method: AxiosRequestConfig['method'], params: T | undefined) {
    const sendData: {
      data?: any;
      params?: any;
    } = {};
    switch (method) {
      case 'PUT':
      case 'POST':
      case 'DELETE':
      case 'PATCH':
        sendData.data = params;
        break;
      default:
        sendData.params = params;
        break;
    }
    return sendData;
  }
  private transformRestfulUrl<T extends object>(_url: string, params: T | undefined) {
    let url = _url.replace(/{/g, '{:');
    // 替换url中的{:id}等模板参数
    if (params && /{:\w+}/.test(url)) {
      (url.match(/{:\w+}/g) || []).forEach((matched) => {
        const key = String(matched.match(/\w+/)) as keyof typeof params;
        if (key in params) {
          url = url.replace(/{:\w+}/, String(params[key]));
          delete params[key];
        }
      });
    }
    return url;
  }
  generateFunc<Q extends object, R = any>(_method: AxiosRequestConfig['method'], _url: string) {
    const method = _method?.toUpperCase();
    return (params?: Q, config?: AxiosRequestConfig) => {
      const url = this.transformRestfulUrl(_url, params);
      const sendData = this.transformSendData<Q>(method, params);
      return this.instance.request<R>({
        url,
        method,
        ...config,
        ...sendData,
      });
    };
  }
  useRequestInterceptor() {
    this._requestInterceptor &&
      (this._requestInterceptorId = this._instance.interceptors.request.use(...this._requestInterceptor));
  }
  useResponseInterceptor() {
    this._responseInterceptor &&
      (this._responseInterceptorId = this._instance.interceptors.response.use(...this._responseInterceptor));
  }
  ejectRequestInterceptor() {
    if (this._requestInterceptorId) {
      this.instance.interceptors.request.eject(this._requestInterceptorId);
      this._requestInterceptorId = undefined;
    }
  }
  ejectResponseInterceptor() {
    if (this._responseInterceptorId) {
      this.instance.interceptors.request.eject(this._responseInterceptorId);
      this._responseInterceptorId = undefined;
    }
  }
}
