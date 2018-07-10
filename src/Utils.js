import moment from 'moment'
import config from '@/Config'
import axios from 'axios'

const format = (date, isTimeVisible) => {
  let time = date
  let dateTime = time.getFullYear()
  dateTime += '-' + String(Number(time.getMonth() + 1) >= 10 ? Number(time.getMonth() + 1) : '0' + (time.getMonth() + 1))
  dateTime += '-' + String(Number(time.getDate()) >= 10 ? Number(time.getDate()) : '0' + time.getDate())
  if (isTimeVisible !== undefined && isTimeVisible === true) {
    dateTime += ' ' + String(Number(time.getHours()) >= 10 ? time.getHours() : ('0' + time.getHours()))
    dateTime += ':' + String(Number(time.getMinutes()) >= 10 ? time.getMinutes() : ('0' + time.getMinutes()))
  }
  return dateTime
}

export default {
  httpFailNotify (error, el, message) {
    console.log(`API Request Failed : ${error}`)
    if (error === undefined || error.response === undefined) {
      el.$vueOnToast.pop('error', '실패', '요청 오류.')
      return false
    }
    let stateCode = error.response.status.toString()
    console.error('응답 코드: ', stateCode, '응답 결과', error, error.response)
    if (message !== undefined && message[stateCode] !== undefined) {
      el.$vueOnToast.pop(message[stateCode].type, message[stateCode].title, message[stateCode].msg)
    } else if (stateCode.startsWith(4)) {
      // 요청 오류
      if (stateCode === '400') {
        el.$vueOnToast.pop('error', '실패', '요청이 잘못 되었습니다.')
      } else if (stateCode === '401') {
        el.$vueOnToast.pop('error', '실패', '요청의 권한이 없습니다.')
        el.$router.push('/login')
      } else if (stateCode === '403') {
        el.$vueOnToast.pop('error', '실패', '접근 권한이 없습니다.')
        el.$router.go(-1)
      } else if (stateCode === '405') {
        el.$vueOnToast.pop('error', '실패', '허용되지 않는 요청입니다.')
      } else if (stateCode === '415') {
        el.$vueOnToast.pop('error', '실패', '지원되지 않는 미디어 유형입니다.')
      } else {
        el.$vueOnToast.pop('error', '실패', '요청 오류.')
      }
    } else if (stateCode.startsWith('5')) {
      // 서버 오류
      el.$vueOnToast.pop('error', '실패', '서버 오류가 발생 하였습니다.')
    }
  },
  timestampToTime (timestamp, unit, intervalUnit) {
    if (timestamp === undefined || timestamp === null) {
      return null
    }
    let time = new Date()
    if (unit === 'm') {
      time.setTime(timestamp / 1000000)
    } else {
      time.setTime(timestamp)
    }
    if (intervalUnit === undefined || intervalUnit === 'T' || intervalUnit === 'H') {
      return format(time, true)
    } else {
      return format(time, false)
    }
  },
  timeToTimestamp (time) {
    if (time === undefined || time === null) {
      return null
    }
    let ts = new Date(time)
    return ts.getTime()
  },
  timeFormat (date) {
    return format(date, true)
  },
  timeToString (date, isTimeVisible) {
    return format(date, isTimeVisible)
  },
  getChartLabels (start, end, interval, intervalUnit, dateFormat) {
    let currentTime = new Date(start)
    let endTime = new Date(end)
    currentTime.setHours(0)
    currentTime.setMinutes(0)
    endTime.setHours(23)
    endTime.setMinutes(59)
    let chartLabels = []
    while (currentTime.getTime() <= endTime.getTime()) {
      if (intervalUnit === 'T') {
        currentTime.setMinutes(currentTime.getMinutes() + Number(interval))
      } else if (intervalUnit === 'H') {
        currentTime.setHours(currentTime.getHours() + Number(interval))
      } else if (intervalUnit === 'D') {
        currentTime.setDate(currentTime.getDate() + Number(interval))
      }
      if (Number(config.maxCandleSize) < chartLabels.length) {
        chartLabels.splice(0, 1)
      }
      chartLabels.push(moment(format(currentTime), dateFormat))
    }
    return {
      labels: chartLabels,
      size: chartLabels.length
    }
  },
  numberWithCommas (price) {
    // let priceArr = String(price).indexOf('.')
    // let num = priceArr[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, ',')
    // priceArr[0] = '.'
    // num = priceArr.join('')
    return price
  },
  capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  sleep (ms) {
    let ts1 = new Date().getTime() + ms
    let ts2 = new Date().getTime()
    while (ts2 < ts1) {
      ts2 = new Date().getTime()
    }
  },
  convertQueryStringToObject (query) {
    // Object.keys(a).forEach(o => {
    // })
  },
  convertObjectToQueryString (obj) {
    let query = '?'
    if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        query += String(key) + '=' + String(obj[key]) + '&'
      })
      query = query.substring(0, query.length - 1)
    }
    return query
  },
  UUID () {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase()
  },
  obtainingDateDays (from, to) {
    let fy = from.substring(0, 4)
    let fm = from.substring(5, 6)
    let fd = from.substring(6, 8)
    let ty = to.substring(0, 4)
    let tm = to.substring(5, 6)
    let td = to.substring(6, 8)
    let f = new Date(fy, fm, fd)
    let t = new Date(ty, tm, td)
    let diff = t.getTime() - f.getTime()
    return Math.floor(diff / 1000 / 3600 / 24)
  },
  convertCash (amount) {
    let unit = ''
    unit = amount / 1000 >= 1 ? 'K' : unit
    unit = amount / 1000000 >= 1 ? 'M' : unit
    unit = amount / 1000000000 >= 1 ? 'B' : unit
    unit = amount / 1000000000000 >= 1 ? 'T' : unit
    let convertAmount = 0
    switch (unit) {
      case 'K': convertAmount = amount / 1000; break
      case 'M': convertAmount = amount / 1000000; break
      case 'B': convertAmount = amount / 1000000000; break
      case 'T': convertAmount = amount / 1000000000000; break
      default: convertAmount = amount
    }
    return convertAmount.toFixed(2) + unit
  },
  calculationRecruitPct (amount, recruitAmount) {
    return Math.floor(recruitAmount / amount * 100)
  },
  LPAD (s, c, n) {
    if (!s || !c || String(s).length >= n) {
      return s
    }
    let max = (n - String(s).length) / c.length
    for (var i = 0; i < max; i++) {
      s = c + s
    }
    return s
  },
  RPAD (s, c, n) {
    if (!s || !c || String(s).length >= n) {
      return s
    }
    let max = (n - String(s).length) / c.length
    for (var i = 0; i < max; i++) {
      s += c
    }
    return s
  }
}
