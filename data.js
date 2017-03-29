'use strict'

const log = require('./log')
const stats = require('./stats')
const request = require('request')

function songs (album, lang) {
  log('requesting songs...')
  return new Promise((resolve, reject) => {
    const opts = {
      uri: `http://www.kanyerest.xyz/api/album/${album}`,
      method: 'GET'
    }
    stats.incCounter('kanyerest_requests')
    stats.startTimer('kanyerest')
    request(opts, (err, data) => {
      log('songs list received.')
      stats.stopTimer('kanyerest')
      if (err) {
        return reject(err)
      }
      try {
        const tracks = JSON.parse(data.body).result
        Promise.all(tracks.map((track) => {
          return translate(track.lyrics, lang).then((translation) => {
            return {
              album: track.album,
              title: track.title,
              lyrics: translation
            }
          })
        })).then(resolve, reject)
      } catch (err) {
        reject(err)
      }
    })
  })
}

function translate (text, lang) {
  return new Promise((resolve, reject) => {
    log('requesting translation...')
    const opts = {
      uri: `http://api.funtranslations.com/translate/${lang}.json`,
      method: 'POST',
      json: {text},
      headers: {
        'X-FunTranslations-Api-Secret': 'P_x4EDfYuco_CKIJUqyOHQeF'
      }
    }
    stats.incCounter('funtranslations_requests')
    stats.startTimer('funtranslations')
    request(opts, (err, data) => {
      stats.stopTimer('funtranslations')
      log('translation received.')
      if (err) {
        return reject(err)
      }
      try {
        resolve(data.body.contents.translated)
      } catch (err) {
        resolve('n/a')
      }
    })
  })
}

module.exports = {songs}
