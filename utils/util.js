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
    '灯光和花火一起闪亮，也亮不过我的梦想'
  ]

  var len = slogns.length
  var i = Math.floor(Math.random() * len)
  return slogns[1]
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  randowSlogn: randowSlogn
}
