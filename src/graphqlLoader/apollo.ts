import { TRequestInterceptor, TResponseInterceptor, XsAxios } from '@src/xsAxios';
import { AxiosRequestConfig } from 'axios';
type TApolloConfig = {
  appName: string;
  baseUrl?: string;
  requestInterceptor?: TRequestInterceptor;
  responseInterceptor?: TResponseInterceptor;
  axiosRequestConfig?: AxiosRequestConfig;
};
export type TGraphqlQuerPayload<T extends Record<string, Record<string, any>>> = {
  query: string;
} & T;

export class ApolloClient {
  private _config: TApolloConfig = {
    appName: '',
    baseUrl: '',
    requestInterceptor: undefined,
    responseInterceptor: undefined,
    axiosRequestConfig: {},
  };
  private _instance = new XsAxios({});
  private generateApolloRequest = () => {
    this._instance = new XsAxios({
      baseURL: this._config.baseUrl,
      requestInterceptor: this._config.requestInterceptor,
      responseInterceptor: this._config.responseInterceptor,
    });
  };
  // 获取graphql语句中的查询字段
  private getUrlQuery = (gql: string) => {
    let str = gql.slice(gql.indexOf('{') + 1);
    let endPos1 = str.indexOf('('); // 参数起始位置
    let endPos2 = str.indexOf('{'); // 查询字段起始位置
    const endPos = endPos1 > 0 && endPos1 < endPos2 ? endPos1 : endPos2;
    if (endPos) {
      str = str.slice(0, endPos);
      return str.trim().slice(0, 150);
    }
    return 'unknown';
  };
  constructor(config: TApolloConfig) {
    this._config = config;
    this.generateApolloRequest();
  }
  get instance() {
    return this._instance;
  }
  graphqlQuery<T extends Record<string, Record<string, any>>>(payload: TGraphqlQuerPayload<T>) {
    const { query } = payload;
    return this.instance.generateFunc('post', `/${this._config.appName as string}/graphql?${this.getUrlQuery(query)}`)(
      payload,
      this._config.axiosRequestConfig,
    );
  }
  apolloRegister(config: Omit<TApolloConfig, 'appName'> & { appName?: string }) {
    const { appName, baseUrl, requestInterceptor, responseInterceptor, axiosRequestConfig } = config;
    this._config = {
      appName: appName || this._config.appName,
      baseUrl: baseUrl || this._config.baseUrl,
      requestInterceptor: requestInterceptor || this._config.requestInterceptor,
      responseInterceptor: responseInterceptor || this._config.responseInterceptor,
      axiosRequestConfig: axiosRequestConfig || this._config.axiosRequestConfig,
    };
    this.generateApolloRequest();
  }
}
