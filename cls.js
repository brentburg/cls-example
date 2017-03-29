'use strict'

const asyncHook = require('async-hook')
const fs = require('fs')

class CLSNamespace {
  constructor () {
    this.context = null
    const contexts = new Map()
    const ns = this

    asyncHook.addHooks({
      init (uid) {
        contexts.set(uid, ns.context)
      },
      pre (uid) {
        ns.context = contexts.get(uid)
      },
      post (uid) {
        ns.context = null
      },
      destroy (uid) {
        contexts.delete(uid)
      }
    })

    asyncHook.enable()
  }

  run (cb) {
    process.nextTick(() => {
      this.context = Object.create(this.context)
      cb()
      this.context = null
    })
  }
}

module.exports = exports = new CLSNamespace()
exports.namespace = () => new CLSNamespace()
