
/**
 * 获取随机字符串
 * @param length 
 * @returns string
 */
const getNonceStr = (length = 16) => {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * 62));
  }
  return str;
}

/**
 * 获取时间戳
 * @returns string
 */
const getTimestamp = () => {
  return Math.round(new Date().getTime() / 1000)
}

/**
 * 时间格式化函数
 * @param {string} time 时间戳，为空则取当前时间
 * @param {string} format format格式，为空则返回扩展过的date对象
 * @returns format格式时间或者扩展过的date对象
 */
const dateFormat = function (time, format?: any) {
  let date;
  if (time) {
    //兼容ios 把yyyy-MM-dd hh:mm 改为 yyyy/MM/dd hh:mm
    if (typeof time == 'string') {
      time = time.replace(/\s+/g, ' '); //转换中文空格
      time = time.replace(/-/g, '/');
    }
    if (typeof time == 'string' && time.indexOf('24:') >= 0) {
      time = time.replace('24:', '23:');
      var _temp_date = new Date(time);
      date = new Date(_temp_date.getTime() + 60 * 60 * 1000);
    } else {
      date = new Date(time);
    }
  } else {
    date = new Date();
  }
  let _time = date.getTime(),
    _year = date.getFullYear(),
    _month = date.getMonth() + 1,
    _date = date.getDate(),
    _hour = date.getHours(),
    _minute = date.getMinutes(),
    _second = date.getSeconds();
  if (format) {
    //大小写转换
    format = format.replace(/Y/g, 'y');
    format = format.replace(/D/g, 'd');
    format = format.replace(/H/g, 'h');
    format = format.replace(/S/g, 's');
    format = format.replace('yyyy', _year);
    format = format.replace('MM', _month < 10 ? '0' + _month : _month);
    format = format.replace('dd', _date < 10 ? '0' + _date : _date);
    format = format.replace('hh', _hour < 10 ? '0' + _hour : _hour);
    format = format.replace('mm', _minute < 10 ? '0' + _minute : _minute);
    format = format.replace('ss', _second < 10 ? '0' + _second : _second);

    format = format.replace('M', _month);
    format = format.replace('d', _date);
    format = format.replace('h', _hour);
    format = format.replace('m', _minute);
    format = format.replace('s', _second);

    return format;
  } else {
    let _dateTime = new Date(_year + '/' + _month + '/' + _date + ' 00:00');
    let obj = {
      year: _year,
      month: _month,
      day: _date,
      hour: _hour,
      minute: _minute,
      second: _second,

      time: _time, // 毫秒数
      dateTime: _dateTime.getTime(),
      date: date,
    };

    return obj;
  }
};


export {
  getNonceStr,
  getTimestamp,
  dateFormat,
}