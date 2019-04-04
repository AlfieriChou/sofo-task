export const mergeDeep = (target: any, source: any) => {
  if (!isObject(target)) {
    return target
  }
  const output = Object.assign({}, target)
  if (!isObject(source)) {
    return output
  }
  const keys = Object.keys(source)
  for (let key of keys) {
    if (isObject(target[key]) && isObject(source[key])) {
      output[key] = mergeDeep(target[key], source[key])
    }
    output[key] = source[key]
  }
  return output
}

const isObject = item => {
  return item && typeof item === 'object' && !Array.isArray(item)
}
