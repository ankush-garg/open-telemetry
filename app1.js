'use strict'

require('./trace')('app-1')

const express = require('express')

const PORT = process.env.PORT || '8080'
const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello World App 1')
})

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`)
})
