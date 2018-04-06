export default {
  name: 'config',
  baseUrl: 'http://localhost:8080/v1',
  defaultHeaders () {
    return {
      'X-coincloud-user-id': 'abcd-1234-bcde-44ggg',
      'Content-type': 'application/json'
    }
  }
}
