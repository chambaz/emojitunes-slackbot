// require dependencies
const request = require('superagent')
const emoji = require('node-emoji')
const Botkit = require('botkit')
const token = process.env.SLACK_TOKEN
const controller = Botkit.slackbot({
  retry: Infinity,
  debug: true
})

// assume single team mode if we have a SLACK_TOKEN
if (token) {
  controller.spawn({
    token: token
  }).startRTM(err => {
    if (err) {
      throw new Error(err)
    }
  })

// otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  require('beepboop-botkit').start(controller, { debug: true })
}

// reply to a direct mention - @bot hello
controller.on('mention', handleMessage)

// reply to a direct mention - @bot hello
controller.on('direct_mention', handleMessage)

// reply to a direct message
controller.on('direct_message', handleMessage)

function handleMessage(bot, message) {
  let foundEmoji = ''
  let playlist = false
  let sendTo = false

  // loop through each word searching for an emoji
  message.text.split(' ').every(word => {
    let w = word.trim()

    // test if word starts and ends with :
    // in which case convert to emoji first
    if (w.startsWith(':') && w.endsWith(':')) {
      w = emoji.get(w)
    }

    // test for emoji and break when one found
    if (emoji.which(w)) {
      foundEmoji = word
    }

    // check for word playlist
    if (w.toLowerCase() === 'playlist') {
      playlist = true
    }

    // check for word send and user
    if (w.startsWith('<') && w.endsWith('>')) {
      sendTo = w.substring(2, w.length - 1)
      bot.reply(message, 'You got it, sending it their way 👍')
    }

    return true
  })

  // no emoji found so let user know
  if (!foundEmoji) {
    console.log('No emoji found in message')
    request
        .get(`https://emojitunes.io/api/msgs/no-emoji`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const json = JSON.parse(res.text)
          bot.reply(message, json.msg)
        })
  // emoji found so send recommendations back
  } else {
    console.log('Found emoji!', foundEmoji)
    fetchRecommendations(bot, message, sendTo, foundEmoji, playlist)
  }
}

// fetch recommendations from emojitunes API
// pass data on and send recommendation to channel
function fetchRecommendations(bot, message, sendTo, emoji, playlist) {
  console.log('Making request...')

  const type = playlist ? 'playlists' : 'tracks'

  request
      .get(`https://emojitunes.io/api/recommendations/${type}/${emoji}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('Error getting recommendations', err)
          return
        }

        const json = JSON.parse(res.text)

        // error from API so let user know
        if (err || json.error) {
          bot.reply(message, 'Oops, something went wrong 😞')
          return
        } else if (json.msg) {
          bot.reply(message, json.msg)
          return
        }

        sendRecommendation(bot, message, sendTo, json.items[0].url, emoji)
      })
}

// send a recommendation to a channel
function sendRecommendation(bot, message, sendTo, url, emoji) {
	// we need the recommendation URL
  if (!url) {
    return false
  }

  // sending recommendation to a user
  if (sendTo) {
    let msg = `Hey! Someone sent you some ${emoji}`

    // find username of original sender
    bot.api.users.info({user: message.user}, (err, response) => {

      // update message with original senders name
      if (!err) {
        msg = msg.replace('Someone', `@${response['user'].name}`)
      }

      // let them know the recco was sent
      bot.say({
        text: msg,
        channel: sendTo
      })

      // send user recco
      setTimeout(() => {
        bot.say({
          text: url,
          channel: sendTo
        })
      }, 1000)
    })

    return
  }

	// if no message specified then grab one from msgs module based on emoji
  request
      .get(`https://emojitunes.io/api/msgs/recommendation/${emoji}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        // send message to channel followed by recommendation URL
        const json = JSON.parse(res.text)
        bot.reply(message, json.msg)
        setTimeout(() => bot.reply(message, url), 1000)
      })
}
