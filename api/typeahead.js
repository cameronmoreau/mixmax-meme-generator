const key = require('../utils/key')
const memes = require('./memes')

// The Type Ahead API.
module.exports = (req, res) => {
  const term = req.query.text.trim()
  const termSplit = term.split(' ')
  let results = [{
    title: '<i>(enter [meme] [top text;bottom text])</i>',
    text: term
  }]

  // Meme hasnt been selected
  if(!term || termSplit.length < 2) {
    results = results.concat(getMemeList(term))
  }

  // Selected meme but its not a meme
  if(termSplit.length > 0) {
    const meme = memes[termSplit[0]]

    // Meme not found
    if(!meme) {
      results.push({
        title: `<i>Meme not found: ${termSplit[0]}</i>`
      })
    }

    // Meme selected
    else {
      results.push({
        title: `<i>Using meme: ${termSplit[0]}</i>`,
        text: term
      })
    }
  }

  res.send(results)
}

const getMemeList = (term) => {
  return Object.keys(memes)
    .filter(meme => {
      return meme.startsWith(term)
    })
    .map(meme => {
      return {
        title: `<i><strong>${meme}</strong> - ${memes[meme]}</i>`
      }
    })
}