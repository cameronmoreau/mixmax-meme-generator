const key = require('../utils/key');
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
        result.body = `<img src="https://mixmax-meme-generator.herokuapp.com/${url}">`
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
  let line = ''

  for(const word of words) {
    // Check if current line + space
    if((line + word + 1).length <= MAX_CHARS) {
      line += word.toUpperCase() + ' '
    } 
    
    // Create a new line
    else {
      lines.push(line.trim())
      line = word.toUpperCase() + ' '
    }
  }

  // Add overflow
  if(line.length > 0) lines.push(line)
  
  return lines
}

const generateMeme = (meme, topText = '', bottomText = '') => {
  return new Promise((resolve, reject) => {
    const url = `public/memes/${new Date().getTime()}.png`
    const image = gm(`public/raw_memes/${meme}.jpg`)
                    .fill("#FFF")
                    .fontSize(68)
                    .font("Impact.ttf")

    const topLines = generateLines(topText)
    const bottomLines = generateLines(bottomText)

    // Generate top lines
    topLines.forEach((item, index) => {
      image.drawText(0, 70*index, item, ['North'])
    })

    // Generate bottom lines
    bottomLines.forEach((item, index) => {
      image.drawText(0, 70*(bottomLines.length-index-1), item, ['South'])
    })

    image.write(url, err => {
      if(err) reject(err)
      else resolve(url)
    })
  })
}