var merge = require('webpack-merge')
// var prodEnv = require('./prod.env')

var envs = {
  NODE_ENV: '"development"',
  COIN_DEV: '"false"'
}

if (process.env.API_SERVER !== '') {
  envs['API_SERVER'] = `"${process.env.API_SERVER}"`
  envs['API_SERVER_PORT'] = `"${process.env.API_SERVER_PORT}"`
}
if (process.env.TEST_RESULT_URL !== undefined) {
  envs['TEST_RESULT_URL'] = `"${process.env.TEST_RESULT_URL}"`
} else {
  envs['TEST_RESULT_URL'] = `"http://dev.systom.io:10101/result.json"`
}
console.log('ENVS: ', envs)
// `${http://dev.systom.io:10101/result.json}`
// module.exports = merge(prodEnv, {NODE_ENV: '"development"', COIN_DEV: '"false"'})
// module.exports = merge(prodEnv, envs)
module.exports = envs
