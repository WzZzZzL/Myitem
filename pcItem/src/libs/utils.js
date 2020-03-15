// 计算任意数字之和
function sum() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

// 求任意数中的最小值
function minNum() {
  var min = arguments[0];
  for (var i = 0; i < arguments.length; i++) {
    if (min > arguments[i]) {
      min = arguments[i];
    }
  }
  // console.log(min);
  return min;
}

// 求任意数中的最大值
function maxNum() {
  var max = arguments[0];
  for (var i = 0; i < arguments.length; i++) {
    if (max < arguments[i]) {
      max = arguments[i];
    }
  }
  // console.log(min);
  return max;
}

// 生成一个任意范围内的随机整数
function getRandomNum(a, b) {
  if (a > b) {
    return parseInt(Math.random() * (a - b + 1)) + b;
  }
  return parseInt(Math.random() * (b - a + 1)) + a;
}

//冒泡排序
function bubble(arr) {
  var temp;
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

//选择排序
function selectSort(arr) {
  var temp;
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

// 封装一个随机颜色（不依赖 getRandomNum(a, b))
function getRandomColor(a) {
  if (a === 16) {
    var str = "0123456789abcdef";
    var res = "";
    for (var i = 0; i < 6; i++) {
      var idx = parseInt(Math.random() * 16);
      res += str[idx];
    }
    return "#" + res;
  }

  var r = parseInt(Math.random() * 256);
  var g = parseInt(Math.random() * 256);
  var b = parseInt(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}

// 封装一个函数来写事件的兼容
function bindEvent(ele, type, fn) {
  // 做兼容判断
  if (ele.addEventListener) {
    ele.addEventListener(type, function () {
      fn();
    });
  } else {
    ele.attachEvent("on" + type, function () {
      fn();
    });
  }
}

/* 
    封装获取元素的函数：
*/
function getEle(ele) {
  // substr(参数1，参数2)
  // 参数1表示开始的索引位置
  // 参数2表示截取个数，如果没有参数2表示从开始位置截取到最后
  var str1 = ele.substr(0, 1); //拿到前面的字符
  var str2 = ele.substr(1);

  if (str1 === "#") {
    return document.getElementById(str2);
  } else if (str1 === ".") {
    return document.getElementsByClassName(str2);
  } else {
    return document.getElementsByTagName(ele);
  }
}

// 获取非行内样式的
function getStyle(ele, attr) {
  var style;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(ele)[attr];
  } else {
    style = ele.currentStyle[attr];
  }
  return style;
}

// 动画函数基础版
function move(ele, obj) {
  let left = 0;
  // 记录定时器的个数
  let timerLen = 0;
  for (const attr in obj) {
    // 循环一次创建一个定时器，timerLen + 1
    timerLen++;
    // 把定时器通过属性绑定 在ele元素身上
    ele[attr] = setInterval(() => {
      left += 5;
      if (left >= obj[attr]) {
        left = obj[attr];
        // 哪个属性的动画执行而完程，就清除哪个属性的定时器
        clearInterval(ele[attr]);
        // 清除一个定时器那么就 timerLen - 1
        // 直到timerLen  = 0 表示所有定时器都清除完成，那么也就是动画执行完成
        timerLen--;
        if (timerLen === 0) {
          ele.style.background = "blue";
        }
      }
      ele.style[attr] = left + "px";
    }, 30);
  }
}

// 动画函数升级版
function move2(ele, obj, callback) {
  let timerLen = 0;
  for (const attr in obj) {
    // 防止抖动
    clearInterval(ele[attr]);

    timerLen++;
    ele[attr] = setInterval(() => {
      let curStyle;
      if (attr === "opacity") {
        curStyle = getStyle(ele, attr) * 100;
      } else {
        curStyle = parseInt(getStyle(ele, attr));
      }
      let speed = (obj[attr] - curStyle) / 5;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //取整
      if (curStyle === obj[attr]) {
        clearInterval(ele[attr]);
        timerLen--;
        if (timerLen === 0) {
          callback && callback();
        }
      } else {
        if (attr === "opacity") {
          ele.style[attr] = (speed + curStyle) / 100;
        } else {
          ele.style[attr] = speed + curStyle + "px";
        }
      }
    }, 30);
  }
}

//随机6位验证码
function codeRandom() {
  var str = "";
  for (var i = 0; i < 6; i++) {
    var n = parseInt(48 + Math.random() * (122 - 48 + 1));
    while ((n >= 58 && n <= 64) || (n >= 91 && n <= 96)) {
      n = parseInt(48 + Math.random() * (122 - 48 + 1));
    }
    var char = String.fromCharCode(n);

    str += char;
  }
  return str;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
  var reg = /^[a-zA-Z0-9]+([._-]*[a-zA-Z0-9]*)*@[a-zA-Z0-9]+.[a-zA-Z0-9{2,5}$]/;
  var result = reg.test(emailStr);
  if (result) {
    alert("ok");
  } else {
    alert("error");
  }
}

// 判断是否是手机号
function isMobilePhone(phone) {
  var reg = /^1\d{10}$/;
  if (reg.test(phone)) {
    alert("ok");
  } else {
    alert("error");
  }
}

// 取出所有cookie，构造成一个对象
function getCookie(key) {
  let str = document.cookie
  let cookies = str.split('; ')
  let obj = new Object()
  cookies.forEach(item => {
    let arr = item.split('=')
    obj[arr[0]] = decodeURIComponent(arr[1])
  })
  // 从对象里找到key的属性值
  return obj[key]
}

/** 存一条cookie
 * @param {string} key 要存的cookie的名称
 * @param {string} value  要存的cookie的值
 * @param {object} [options]  可选参数，制定存cookie的一些选项，比如 { expires: 7, path: '/'}，存一条7天过期，根目录的cookie
 */
function setCookie(key, value, options) {
  // 编码再存
  let str = `${key}=${encodeURIComponent(value)}`
  // 先判断是否传了options
  if (options) {
    // 再判断options里面有什么属性
    if (options.expires) {
      var date = new Date()
      date.setDate(date.getDate() + options.expires)
      str += `;expires=${date.toUTCString()}`
    }
    if (options.path) {
      str += `;path=${options.path}`
    }
  }
  document.cookie = str
}

/** ajax get请求
 * @param {string} url 请求路径
 * @param {object} query 请求要携带的参数
 * @param {function} fn 请求成功之后的回调函数
 * @param {boolean} [isJson] 请求数据是否为json，默认值为true
 */
function get(url, query, fn, isJson = true) {
  //参数默认值的写法是ES6新增的
  //如果有query，在url后面拼接query
  if (query) {
    url += '?'
    for (var key in query) {
      url += `${key}=${query[key]}&`
    }
    //在拼接完成后最后会多出一个$
    url = url.slice(0, -1)
  }
  //1.创建核心对象
  var xhr = new XMLHttpRequest()
  //2.打开连接
  xhr.open('get', url)
  //3.发送请求
  xhr.send()
  //4.监听状态改变
  xhr.onreadystatechange = function () {
    //请求成功
    //如果isjson为true，就parse忠厚传过去，否则就传字符串本身
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
        //回调的常规写法：fn有效才调用
        fn && fn(res)
      }
    }
  }
}

/** ajax post请求
 * @param {string} url 请求路径
 * @param {object} query 请求要携带的参数
 * @param {function} fn 请求成功之后的回调函数
 * @param {boolean} [isJson] 请求数据是否为json，默认值为true
 */
function post(url, query, fn, isJson = true) {
  var str = ''
  if (query) {
    for (var key in query) {
      str += `${key}=${query[key]}&`
    }
    str = str.slice(0, -1)
  }
  var xhr = new XMLHttpRequest("Content-type", "application/x-www-form-urlencoded")
  //把发送的数据格式设置为urlencoded
  xhr.setRequestHeader
  xhr.open('post', url)
  xhr.send(str)
  xhr.onreadystatechange = function () {
    //请求成功
    //如果isjson为true，就parse忠厚传过去，否则就传字符串本身
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
        //回调的常规写法：fn有效才调用
        fn && fn(res)
      }
    }
  }
}
/**jsonp请求
   * 
   * @param {string} url     请求的路径
   * @param {string} cb      回调函数名（这个函数必须是全局函数）
   * @param {object} [query] 其他参数
   */
function jsonp(url, cb, query) {
  // 创建script标签
  url += `?cb=${cb}`
  if (query) {
    for (var key in query) {
      url += `&${key}=${query[key]}`
    }
  }
  var script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
  // 过河拆桥
  document.body.removeChild(script)
}

/** 基于promise的ajax get请求
   * @param {string} url 请求路径
   * @param {object} query  请求要携带的参数
   * @param {boolean} [isJson] 请求数据是否为json，默认值为true
   */
function fetch(url, query, isJson = true) {
  if (query) {
    url += '?'
    for (var key in query) {
      url += `${key}=${query[key]}&`
    }
    url = url.slice(0, -1)
  }
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(isJson ? JSON.parse(xhr.responseText) : xhr.responseText)
        } else {
          reject()
        }
      }
    }
  })
}