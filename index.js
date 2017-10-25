'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const HEML = (heml) => Promise.resolve({ html: `<html>
  <body>hi from the server</body></html>`})

app.use(bodyParser.json())

app.options('*', cors())

app.post('/', cors({ origin: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://heml.io' }), function (req, res) {
  return HEML(req.body.heml || '')
    .then((results) => {
      res.status(200).send(results)
    })
})

app.listen(process.env.PORT || 5000, function () {
  console.log(`listening on port ${process.env.PORT || 5000}!`)
})