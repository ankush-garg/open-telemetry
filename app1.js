'use strict'

require('./trace')('app-1')

const express = require('express')
const fetch = require('node-fetch')

const PORT = process.env.PORT || '8080'
const app = express()

app.get('/hello', async (req, res, next) => {
  const response = await fetch('http://localhost:8081/hello')
  const body = await response.text()
  res.send('Hello World App 1 received - ' + body)
})

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`)
})
