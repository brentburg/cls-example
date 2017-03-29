'use strict'

const Timer = require('timer-machine')
const cls = require('./cls')

class Stats {
  constructor (ns) {
    this.cls = ns
  }

  init () {
    if (this.cls.context === null) {
      return null
    }
    if (!this.cls.context.stats) {
      this.cls.context.stats = {
        timers: {},
        counters: {}
      }
    }
    return this.cls.context.stats
  }

  startTimer (name) {
    const stats = this.init()
    if (stats) {
      if (!stats.timers[name]) {
        stats.timers[name] = new Timer()
      }
      stats.timers[name].start()
    }
  }

  stopTimer (name) {
    const stats = this.init()
    if (stats && stats.timers[name]) {
      stats.timers[name].stopParallel()
    }
  }

  incCounter (name) {
    const stats = this.init()
    if (stats) {
      if (!stats.counters[name]) {
        stats.counters[name] = 0
      }
      stats.counters[name] += 1
    }
  }

  decCounter (name) {
    const stats = this.init()
    if (stats) {
      if (!stats.counters[name]) {
        stats.counters[name] = 0
      }
      stats.counters[name] -= 1
    }
  }

  report () {
    const stats = this.init()
    if (!stats) {
      return {}
    }
    const durations = {}
    for (let key in stats.timers) {
      durations[key] = stats.timers[key].time()
    }
    return Object.assign(durations, stats.counters)
  }
}

module.exports = new Stats(cls)
module.namespace = (ns) => newStats(ns)
