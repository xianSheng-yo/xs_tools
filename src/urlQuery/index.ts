import { isValidRegExp, urlRegex } from '@utils/regExp';
import { isArray } from '@utils/check-types';

export function getURLParameter(): URLSearchParams;
export function getURLParameter(_name: string): string | null;
export function getURLParameter(_name?: string): string | null | URLSearchParams {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (typeof _name === 'string') {
    return urlParams.get(_name);
  } else {
    return urlParams;
  }
}

/**
 * 解析query-string
 * 支持多个同名key的解析，解析为数组
 * 解析后的value是经过decode的
 * @param  {String} url       url字符串
 * @param  {String} [sep='&'] 参数组分隔符，默认是&
 * @param  {String} [eq='=']  key-value分隔符，默认是=
 * @return {Object}           返回解析后的query对象
 */
export function parseURLQueryParamsToObject(url: string, sep: string = '&', eq: string = '=') {
  if (!isValidRegExp(urlRegex, url)) throw new Error('Url error');
  if (!url.includes('?')) return {};
  const queryParams: Record<string, string | undefined | string[]> = {};
  const queryString = url.replace(/.*?\?/, '');
  if (queryString) {
    const keyValuePairs = queryString.split(sep);

    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split(eq);
      const decodeKey = decodeURIComponent(key);
      const decodeValue = value ? decodeURIComponent(value) : undefined;
      if (queryParams[decodeKey] === undefined) {
        queryParams[decodeKey] = decodeValue;
      } else if (isArray(queryParams[decodeKey]) && decodeValue) {
        (queryParams[decodeKey] as Array<string>)?.push(decodeValue);
      } else {
        if (decodeValue) queryParams[decodeKey] = [queryParams[decodeKey] as string, decodeValue];
      }
    });
  }

  return queryParams;
}

/**
 * 格式化query对象
 * 支持数组的格式化，格式化为同名key
 * 格式化后的query-string是经过encode的
 * @param  {Object} object       query对象
 * @param  {String} [sep='&'] 参数组分隔符，默认是&
 * @param  {String} [eq='=']  key-value分隔符，默认是=
 * @return {String}           返回格式化后的query-string
 */
export const parseURLQueryParamsToString = (
  object: Record<string, string | undefined | string[]>,
  sep = '&',
  eq = '=',
): string => {
  let keys = Object.keys(object);

  return keys.reduce((previousValue, key) => {
    const value = object[key];
    if (isArray(value)) {
      return (
        previousValue +
        (value as string[]).map((v) => [encodeURIComponent(key), encodeURIComponent(v)].join(eq)).join(sep)
      );
    }
    if (key && value !== undefined && value !== null) {
      return previousValue + sep + [encodeURIComponent(key), encodeURIComponent(value as string)].join(eq);
    }
    return previousValue + '';
  }, '');
};
