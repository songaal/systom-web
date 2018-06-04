var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

var envs = {NODE_ENV: '"development"', COIN_DEV: '"false"'}
if (process.env.API_SERVER !== '') {
  envs['API_SERVER'] = `"${process.env.API_SERVER}"`
}

// module.exports = merge(prodEnv, {NODE_ENV: '"development"', COIN_DEV: '"false"'})
module.exports = merge(prodEnv, envs)
