function parser(style) {

  if (!style || typeof style !== 'object') {
    return null;
  }

  let [originalStyle, otherStyle] = filter(style, isOriginalCSS);

  return {
    base: originalStyle,
    ...otherStyle
  };
}

/**
 * 小写字母开头当做原生属性
 * @param key
 * @return {boolean}
 */
function isOriginalCSS(key) {
  return /^[a-z]/.test(key);
}

/**
 * 对对象做筛选
 *
 * @param obj
 * @param func
 * @return {[null,null]}
 */
function filter(obj, func) {
  let result = {};
  let others = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (value === null && value === undefined) continue;
      if (func(key, value)) result[key] = value;
      else others[key] = value;
    }
  }
  return [result, others];
}

export default parser;