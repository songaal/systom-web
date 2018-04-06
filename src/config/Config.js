export default {
  name: 'config',
  baseUrl: 'http://api.gncloud.io:8080/v1',
  baseWsUrl: 'ws://api.gncloud.io:8080/test',
  defaultHeaders () {
    return {
      'X-coincloud-user-id': 'abcd-1234-bcde-44ggg',
      'Content-type': 'application/json'
    }
  }
}
