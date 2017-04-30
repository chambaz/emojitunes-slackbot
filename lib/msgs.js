'use strict'

module.exports = (() => {
	// recommendation responses
  const recommendationMsgs = [
    'Ok, how about this...',
    'Try this on for size...',
    'Give this a listen...',
    'I\'m thinking this...',
    'Sure! How\'s this...',
    'Give this a try...',
    'Gimme some mo\''
  ]

  // emoji specific responses
  const emojiMsgs = {
    // 🤘
    ':the_horns:': [
      'A little rawk',
      'Cue the headbanging',
    ],

    // 🇫🇷
    ':flag-fr:': [
      'Ah oui très bien!',
    ],
  }

  // no emoji responses
  const noEmojiMsgs = [
    'Shoot me an emoji',
    'Tell me what you want',
    'How you feeling?',
  ]

  // no results responses
  const noResultsMsgs = [
    'Sorry, couldn\'t find anything for you :disappointed:',
    'I\'ve let you down :flushed:',
    'Yup, my bad, got nothing',
  ]

  // return a random message
  // use specified array default to generic msgs
  function randomMsg(arr = recommendationMsgs) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  return {
    // return emoji specific response if available
    // default to generic response
    getRecommendationMsg: (emoji) => randomMsg(emojiMsgs[emoji]),

    // random no results response
    getNoResultsMsg: () => randomMsg(noResultsMsgs),

    // randome no emoji response
    getNoEmojiMsg: () => randomMsg(noEmojiMsgs),
  }
})()
