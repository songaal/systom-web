const http = require('http');
const url = require('url');
const request = require("request");

const hostname = '0.0.0.0';
const port = 10000;

const server = http.createServer((req, res) => {
  let host = req.headers.host
  let body = null;
  if ('/favicon.ico' === req.url) {
    res.statusCode = 404;
    res.end(body)
    return false
  }
  try {
    let urlParts = url.parse(req.url, true)
    let sendUrl = urlParts.pathname.substring(1)
    let query = urlParts.query
    let sendHeaders = {}
    Object.keys(req.headers).forEach(key => {
      if (key.toUpperCase().startsWith('X')) {
        sendHeaders[key] = req.headers[key]
      }
    })
    var options = { method: 'GET',
                    url: sendUrl,
                    qs: query,
                    headers: sendHeaders
    }
    request(options, function (error, response, data) {
      if (error) {
        throw new Error(error)
      }
      res.headers = req.headers
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader("Access-Control-Allow-Headers","*")
      res.statusCode = 200
      res.end(data)
    })

  } catch(error) {
    res.statusCode = 500
    res.end(error)
  }
})

let listener = server.listen(port, hostname, (error) => {
  console.log(`Server running at http://${hostname}:${port}/`);
};
console.log(listener)
