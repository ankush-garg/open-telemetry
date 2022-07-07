'use strict'

require('./trace')('app-2')

const express = require('express')

const PORT = process.env.PORT || '8081'
const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello World App 2')
})

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`)
})
