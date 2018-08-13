let envs = {
  NODE_ENV: '"production"'
}
if (process.env.TEST_RESULT_URL !== undefined) {
  envs['TEST_RESULT_URL'] = `"${process.env.TEST_RESULT_URL}"`
} else {
  envs['TEST_RESULT_URL'] = `"https://dev.systom.io:10101/result.json"`
}
module.exports = envs
