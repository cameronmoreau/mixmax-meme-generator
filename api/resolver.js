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
    const textSplit = termSplit[1].split(';')
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
  if(termSplit.length !== 2) return false
  else {
    const meme = termSplit[0]
    
    // Found meme
    if(memes[meme]) return true
    else return false
  }
}

const generateMeme = (meme, topText, bottomText) => {
  return new Promise((resolve, reject) => {
    const url = `../memes/${new Date().getTime()}.png`
    gm(`../raw_memes/badluck.jpg`)
      .write(url, err => {
        if(err) reject(err)
        else resolve(url)
      })
  })
}