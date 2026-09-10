'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:8989/servlets/hello',
  connections: 10, // default
  pipelining: 1, // default
  duration: 10 // default
}, (err, result) => {
  if (err) throw err
  console.log(autocannon.printResult(result))
})