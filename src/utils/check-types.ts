/**
 * 数据类型检测工具函数
 */

const toString = Object.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;

export const isArray = (arr: any) => {
  return Array.isArray ? Array.isArray(arr) : toString.call(arr) === '[object Array]';
};

export const isArrayLike = (obj: any) => obj != null && isLength(obj.length) && !isFunction(obj);

export const isBoolean = (bool: any) => toString.call(bool) === '[object Boolean]';

export const isDate = (date: any) => toString.call(date) === '[object Date]';

export const isFunction = (fn: any) => toString.call(fn) === '[object Function]';

export const isLength = (val: any) => {
  return typeof val === 'number' && val > -1 && val % 1 === 0 && val <= Number.MAX_SAFE_INTEGER;
};

export const isNull = (val: any) => val === null;

export const isUndefined = (val: any) => val === void 0;

export const isNumber = (val: any) => {
  return isNull(val) || isUndefined(val) || isNaN(val) ? false : true;
};

export const isObject = (obj: any) => {
  let type = typeof obj;
  return (obj && (type === 'object' || type === 'function')) || false;
};

export const isObjectLike = (obj: any) => obj != null && typeof obj === 'object';

export const isPlainObject = (obj: any) => {
  if (!isObject(obj) || obj.nodeType || obj === obj.window) {
    return false;
  }

  try {
    if (
      obj.constructor &&
      !hasOwn.call(obj, 'constructor') &&
      !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')
    ) {
      return false;
    }
  } catch (e) {
    return false;
  }

  for (var key in obj) {
    //
  }
  //@ts-ignore
  return key === void 0 || hasOwn.call(obj, key);
};

export const isRegExp = (reg: any) => toString.call(reg) === '[object RegExp]';

export const isString = (str: any) => toString.call(str) === '[object String]';

/**
 * 检测一个对象是否是空对象
 * 1.对象为null
 * 2.数组是空数组
 * 3.字面量对象是空对象
 * @param  {Null|Array|Object}  value     检测对象
 * @return {Boolean}      返回是否是空对象
 */
export const isEmpty = (value: any) => {
  if (value === null) {
    return true;
  }

  if (isArray(value)) {
    return !value.length;
  }

  if (isPlainObject(value)) {
    return !Object.keys(value).length;
  }

  return false;
};
