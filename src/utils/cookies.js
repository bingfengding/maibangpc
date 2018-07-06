// 设置cookies
export function setCookie(c_token, exdays) {
  if (exdays) {
    let exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie = `loginToken = ${c_token} ;path=/;expires=${exdate.toGMTString()}`;
  } else {
    window.document.cookie = `loginToken = ${c_token} ;path=/;`;
  }

}
//获取cookies
export function getCookie() {
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //再次切割
      //判断查找相对应的值
      if (arr2[0] == 'loginToken') {
        return arr2[1]
      }
    }
    return false
  }
}
