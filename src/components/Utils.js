export default {
  httpFailNotify (error, el) {
    let stateCode = error.response.status.toString()
    console.error('응답 코드: ', stateCode, '응답 결과', error)
    if (stateCode.startsWith(4)) {
      // 요청 오류
      if (stateCode === '400') {
        el.$vueOnToast.pop('error', '실패', '요청이 잘못 되었습니다.')
      } else if (stateCode === '401') {
        el.$vueOnToast.pop('error', '실패', '권한이 없습니다.')
        el.$router.push('/login')
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
  timestampToTime (timestamp, unit) {
    let time = new Date()
    if (unit === 'm') {
      time.setTime(timestamp / 1000000)
    } else {
      time.setTime(timestamp)
    }
    let dateTime = time.getFullYear()
    dateTime += '-' + String(Number(time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1)))
    dateTime += '-' + String(Number(time.getDate()) >= 10 ? time.getDate() : ('0' + time.getDate()))
    dateTime += ' ' + String(Number(time.getHours()) >= 10 ? time.getHours() : ('0' + time.getHours()))
    dateTime += ':' + String(Number(time.getMinutes()) >= 10 ? time.getMinutes() : ('0' + time.getMinutes()))
    return dateTime
  },
  timeFormat (date) {
    let time = date
    let dateTime = time.getFullYear()
    dateTime += '-' + String(Number(time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1)))
    dateTime += '-' + String(Number(time.getDate()) >= 10 ? time.getDate() : ('0' + time.getDate()))
    dateTime += ' ' + String(Number(time.getHours()) >= 10 ? time.getHours() : ('0' + time.getHours()))
    dateTime += ':' + String(Number(time.getMinutes()) >= 10 ? time.getMinutes() : ('0' + time.getMinutes()))
    return dateTime
  },
  timeToString (date, isTimeVisible) {
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
}
