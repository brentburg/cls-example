'use strict'

const cls = require('./cls')

function log (msg, data) {
  console.dir(Object.assign({
    msg,
    req_id: cls.context && cls.context.id
  }, data), {colors: true})
}

module.exports = log
