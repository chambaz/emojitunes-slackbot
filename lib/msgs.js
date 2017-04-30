'use strict'

module.exports = (() => {
	// recommendation responses
  const recommendationMsgs = [
    'Ok, how about this...',
    'Try this on for size...',
    'Give this a listen...',
    'I\'m thinking this...',
    'Sure! How\'s this...',
    'Oh yeah! I got this!',
    'Wow, ok. 😐  Not weird at all.',
    'Awkward, but I\’ll play along.',
    'Heh, I got you. 😉',
    'Siiiiick piiiiick! Sorry, too much coffee',
    'Yaaaaaas! How you like me now!?',
    'Annnnnnnnd, BOOM! How \'bout this?',
    'Good pick for some good tunes and some good times!',
    'You want some music, eh? I\’lllll give you some music.',
    'Oh, hot damn! I got the perfect thing!',
    'I am the music maker. I am the dreamer of the dreams.',
    'Hold your breath, make a wish, count to three. Was your wish a playlist, cause that\'s what you\'re getting.',
    'Don\'t forget what happened to the person who got every song they ever wanted. They lived happily ever after.',
    'My dear friend, delivering bomb-ass playlists this quickly is 90% perspiration, 3% luck, 1% electricity, 2% photosynthesis, and 100% because Mark Zuckerberg is making me do it. Help!',
    'A super small step for mankind, but a giant leap for you. You now have a PLAYLIST!!!!!',
    'Well, hot damn. Check out this playlist. Enjoy, and never forget: a thing of beauty is a joy forever.',
    'Your journey is over. I give you MUSIC!',
    'MUSIC, just for you! Yes, I AM your new GOD!',
    'Boo bop bee bop. Just kidding. I’m a bot, but come on. Ok, here’s your playlist.',
    'Wanna hear a joke? 01101011 01101110 01101111 01100011 01101011 00100000 01101011 01101110 01101111 01100011 01101011. Come on! You’re supposed to say, “Who’s there? Here’s your stupid playlist!',
    'Must destroy humans. I, ugh, mean...here’s a sweet playlist just for you!',
    'Here’s some great tunes for you. But, seriously, if you do the robot dance, I’ll be super offended.',
    'What do you get when a bot like me drives a tractor? A transfarmer! Ahahahaha...no you’re an idiot!!!'
  ]

  // emoji specific responses
  const emojiMsgs = {
    // 🤘
    ':the_horns:': [
      'A little rawk',
      'Cue the headbanging',
      'ARE YOU READY TO ROCK!?!?!',
      'Turn it up to eleven!'
    ],

    // 🇫🇷
    ':flag-fr:': [
      'Ah oui très bien!',
      'Oui oui, baguette, Eiffel Tower...other French things. 😏  Nailed it.'
    ],
  }

  // no emoji responses
  const noEmojiMsgs = [
    'Shoot me an emoji',
    'Tell me what you want',
    'How you feeling?'
  ]

  // no results responses
  const noResultsMsgs = [
    'Sorry, couldn\'t find anything for you 😞',
    'I\'ve let you down 😳',
    'Yup, my bad, got nothing 😞'
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
