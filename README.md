# Meme Generator for Mixmax

This was a coding challenge sent to me by Mixmax for an internship. Feel free to produce as many dank memes as you'd like.

![typeahead](http://i.imgur.com/aE0lxMN.gif)

Add these two to make the slash command
```
https://mixmax-meme-generator.herokuapp.com/typeahead
https://mixmax-meme-generator.herokuapp.com/resolver
```

## Running locally

1. Brew install everything [needed here](https://github.com/aheckmann/gm)
2. Install using `npm install`
3. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl https://localhost:9145/typeahead?text=wonka --insecure
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl https://localhost:9145/resolver?text=wonka%20hello;world --insecure
```
