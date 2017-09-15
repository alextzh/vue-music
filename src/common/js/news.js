export function getTime(timestamp) {
  let nowTimestamp = Math.floor(new Date().getTime() / 1000)
  let timeSpanStr
  let seconds = nowTimestamp - timestamp
  if (seconds < 60) {
    timeSpanStr = '刚刚'
  } else if (seconds >= 60 && seconds <= 3600) {
    timeSpanStr = Math.floor(seconds / 60) + '分钟前'
  } else if (seconds >= 3600 && seconds <= 86400) {
    timeSpanStr = Math.floor(seconds / 3600) + '小时前'
  } else if (seconds >= 86400) {
    timeSpanStr = Math.floor(seconds / 86400) + '天前'
  }
  return timeSpanStr
}
export function getTimes(now, timestamp) {
  let nowTimestamp = Math.floor(now.getTime() / 1000)
  let timeSpanStr
  let seconds = nowTimestamp - timestamp
  if (seconds < 60) {
    timeSpanStr = '刚刚'
  } else if (seconds >= 60 && seconds <= 3600) {
    timeSpanStr = Math.floor(seconds / 60) + '分钟前'
  } else if (seconds >= 3600 && seconds <= 86400) {
    timeSpanStr = Math.floor(seconds / 3600) + '小时前'
  } else if (seconds >= 86400) {
    timeSpanStr = Math.floor(seconds / 86400) + '天前'
  }
  return timeSpanStr
}
export function format(interval) {
  interval = interval | 0
  const minute = interval / 60 | 0
  const second = _pad(interval % 60)
  return `${minute}:${second}`
}
function _pad(num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}
