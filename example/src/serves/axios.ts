import { XsAxios } from 'xs_tools';
import { TRequestInterceptor } from 'xs_tools/xsAxios';
const requestInterceptor: TRequestInterceptor = [
  (vaule) => {
    return vaule;
  },
  null,
  undefined,
];
const request = new XsAxios({
  baseURL: 'https://reqres.in/',
  requestInterceptor,
});
export const getComment = request.generateFunc('get', 'api/users');
