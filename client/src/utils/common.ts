export const jsonParser = (value: unknown) => {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    return null;
  }
};

export const groupByKey = (array, key) => {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
  }, {});
};

export const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

// const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})
