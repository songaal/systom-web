const ccxt = require('ccxt')

call = async () => {
  var exchange = new ccxt['bithumb']({
    'proxy': 'https://proxy.systom.io/',
    'apiKey': '7c2ace2277f231489130087e5ee4afd3',
    'secret': '5924e3a2d09c1697535464557ab742fd'
  })

  let result = await exchange.fetchBalance({recvWindow: 10000000})
  return result
}

call().then(result => console.log(result))
