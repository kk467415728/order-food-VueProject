//解析url参数
export function urlParse() {
  let url = window.location.search
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  console.log(arr)
  if(arr) {
    arr.forEach(item => {
      let tempArr = item.substring(1).split('=')
      let key = tempArr[0];
      let value = tempArr[1];
      obj[key] = value
    });
  }
  return obj
}