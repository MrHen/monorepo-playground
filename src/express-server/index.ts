import * as express from 'express'
var app = express()

app.get('/status', function (req, res) {
  res.status(200).end();
})

app.get('/hello', function (req, res) {
  res.json({
    'hello': 'world'
  })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
