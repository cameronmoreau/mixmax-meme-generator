const key = require('../utils/key');
const request = require('request');
const _ = require('underscore');
const memes = require('./memes')

const fs = require('fs')
const gm = require('gm').subClass({imageMagick: true});


// The API that returns the in-email representation.
module.exports = (req, res) => {
  const term = req.query.text.trim()
  const termSplit = term.split(' ')
  const result = {
    body: ''
  }

  if(termIsValid(termSplit)) {
    const meme = termSplit[0]
    const textSplit = termSplit.slice(1).join(' ').split(';')
    const topText = textSplit[0]
    const bottomText = textSplit[1]

    generateMeme(meme, topText, bottomText)
      .then(url => {
        result.body = `<img src="${url}">`
        res.send(result)
      })
      .catch(err => {
        console.error(err);
        res.send(result)
      })
  }
  else res.send(result)
}

const termIsValid = (termSplit) => {
  // Check format
  if(termSplit.length <= 1) return false
  else {
    const meme = termSplit[0]
    
    // Found meme
    if(memes[meme]) return true
    else return false
  }
}

const generateLines = (text) => {
  const MAX_CHARS = 16
  const words = text.split(' ')
  const lines = []

  for(const word of words) {
    console.log(word);
  }
}

const generateMeme = (meme, topText = '', bottomText = '') => {
  return new Promise((resolve, reject) => {
    const url = `public/memes/${new Date().getTime()}.png`
    generateLines(topText)
    resolve()
    gm(`public/raw_memes/${meme}.jpg`)
      .fill("#FFF")
      .fontSize(68)
      .font("impact")
      .drawText(0, 0, topText, ['North'])
      .drawText(0, 0, bottomText, ['South'])
      .write(url, err => {
        if(err) reject(err)
        else resolve(url)
      })
  })
}