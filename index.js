'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const HEML = require('heml')

app.use(bodyParser.json())

app.options('*', cors())

app.post('/', cors({ origin: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://heml.io' }), function (req, res) {
  return HEML(req.body.heml || '')
    .then((results) => {

      if (results.errors) {
        results.errors = results.errors.map((error) => {
          return { selector: error.selector, message: error.toString() }
        })
      }

      res.status(200).send(results)
    })
})

app.listen(process.env.PORT || 5000, function () {
  console.log(`listening on port ${process.env.PORT || 5000}!`)
})