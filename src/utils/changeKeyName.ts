type objArr = [{
  [key: string] : any
}]

// 修改对象数组的某个属性的Key值
export const changeKeyName = (arr: objArr, targetKey: string, sourceKey: string) => {
  if (!arr?.length) return arr;
  return arr.map(obj => {
    return JSON.parse(JSON.stringify(obj).replace(sourceKey, targetKey));
  })
}
