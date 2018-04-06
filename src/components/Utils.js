export default {
  httpFailNotify (error, el) {
    let stateCode = error.response.status.toString()
    console.error('응답 코드: ', stateCode, '응답 결과', error)
    if (stateCode.startsWith(4)) {
      // 요청 오류
      if (stateCode === 400) {
        el.$vueOnToast.pop('error', '실패', '요청이 잘못 되었습니다.')
      } else if (stateCode === 401) {
        el.$vueOnToast.pop('error', '실패', '권한이 없습니다.')
      } else if (stateCode === 405) {
        el.$vueOnToast.pop('error', '실패', '허용되지 않는 요청입니다.')
      } else if (stateCode === 415) {
        el.$vueOnToast.pop('error', '실패', '지원되지 않는 미디어 유형입니다.')
      } else {
        el.$vueOnToast.pop('error', '실패', '요청 오류.')
      }
    } else if (stateCode.startsWith(5)) {
      // 서버 오류
      el.$vueOnToast.pop('error', '실패', '서버 오류가 발생 하였습니다.')
    }
  }
}
