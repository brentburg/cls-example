'use strict'

const express = require('express')
const data = require('./data')
const log = require('./log')
const uuid = require('uuid').v4
const cls = require('./cls')
const stats = require('./stats')

const app = express()

app.use((req, res, next) => {
  cls.run(next)
})

app.use((req, res, next) => {
  cls.context.id = req.id = uuid()
  next()
})

app.use((req, res, next) => {
  stats.startTimer('request')
  next()
  req.on('end', () => {
    stats.stopTimer('request')
    log('statsd', stats.report())
  })
})

app.get('/:album/:lang', (req, res, next) => {
  const {album, lang} = req.params
  log('request received', {album, lang})
  data.songs(album, lang)
    .then(results => res.json(results))
    .catch(next)
})

app.listen(3000)

