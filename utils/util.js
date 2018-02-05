//var Promise = require('./bluebird')  
import Promise from './bluebird.js';


function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}



function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function randowSlogn(){
  var slogns = [
    '梦想再大也不算大，再小也不嫌小',
    'Some people choose to see the ugliness in this world, I choose to see the beauty. ',
    '灯光和花火一起闪亮，也亮不过我的梦想',
    '没有梦想, 和咸鱼有什么区别'
  ]
  var len = slogns.length
  var i = Math.floor(Math.random() * len)
  return slogns[i]
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let request = wxPromisify(wx.request)

export { formatTime, randowSlogn, wxPromisify,request }