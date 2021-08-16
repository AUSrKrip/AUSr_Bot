import tmi from 'tmi.js'
import { JOKE_DATA } from './jokes'
import { ALL_TRACKS } from '../track_lists/alltracks'
import { NINJAS } from '../track_lists/ninjalist'
import { STADIUMS } from '../track_lists/stadiumlist'
import { TRIALS } from '../track_lists/trialstracks'
import { SKILL_GAMES } from '../track_lists/skillgames'
import { LEVEL_1 } from '../ninja_tracks/level-1'
import { LEVEL_2 } from '../ninja_tracks/level-2'
import { LEVEL_3 } from '../ninja_tracks/level-3'
import { LEVEL_4 } from '../ninja_tracks/level-4'
import { LEVEL_5 } from '../ninja_tracks/level-5'
import { LEVEL_6 } from '../ninja_tracks/level-6'
import { LEVEL_7 } from '../ninja_tracks/level-7'

const options = {
	options: { debug: true },
	connection: {
    reconnect: true,
    secure: true,
    timeout: 180000,
    reconnectDecay: 1.4,
    reconnectInterval: 1000,
	},
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ 
        ALL_CHANNELS ]
}

const client = new tmi.Client(options)

client.connect()

// events
client.on('disconnected', (reason) => {
  onDisconnectedHandler(reason)
})

client.on('connected', (address, port) => {
  onConnectedHandler(address, port)
})

client.on('hosted', (channel, username, viewers, autohost) => {
  onHostedHandler(channel, username, viewers, autohost)
})

client.on('subscription', (channel, username, method, message, userstate) => {
  onSubscriptionHandler(channel, username, method, message, userstate)
})

client.on('raided', (channel, username, viewers) => {
  onRaidedHandler(channel, username, viewers)
})

client.on('cheer', (channel, userstate, message) => {
  onCheerHandler(channel, userstate, message)
})

client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
  onGiftPaidUpgradeHandler(channel, username, sender, userstate)
})

client.on('hosting', (channel, target, viewers) => {
  onHostingHandler(channel, target, viewers)
})

client.on('reconnect', () => {
  reconnectHandler()
})

client.on('resub', (channel, username, months, message, userstate, methods) => {
  resubHandler(channel, username, months, message, userstate, methods)
})

client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
  subGiftHandler(channel, username, streakMonths, recipient, methods, userstate)
})

// event handlers

client.on('message', (channel, userstate, message, self) => {
  if(self) {
    return
  }

  const commandName = message.trim();

  if (userstate.username === BOT_USERNAME) {
    console.log(`Not checking bot's messages.`)
    return
  }

	if(message.toLowerCase() === '!commands') {
    commands(channel, userstate)
    return
  }

  if (commandName === "!lurk") {
    lurk(channel, userstate)
    return
  }

  if (commandName === "!discord") {
    discord(channel, userstate)
    return
  }

  if (commandName === "!coffee") {
    coffee(channel, userstate)
    return
  }

  if (commandName === "!slurk") {
    slurk(channel, userstate)
    return
  }

  if (commandName === "!track") {
    var tracks = ALL_TRACKS[Math.floor(Math.random() * ALL_TRACKS.length)] + "!";
    client.say(channel, `Your random track is ${tracks}`);
    return
  }

  if (commandName === "!ninja") {
    var tracks = NINJAS[Math.floor(Math.random() * NINJAS.length)] + "!";
    client.say(channel, `Your random ninja is ${tracks}`);
    return
  }

  if (commandName === "!skill") {
    var tracks = SKILL_GAMES[Math.floor(Math.random() * SKILL_GAMES.length)] + "!";
    client.say(channel, `Your random skill game is ${tracks}`);
    return
  }

  if (commandName === "!stadium") {
    var tracks = STADIUMS[Math.floor(Math.random() * STADIUMS.length)] + "!";
    client.say(channel, `Your random stadium is ${tracks}`);
    return
  }

  if (commandName === "!trials") {
    var tracks = TRIALS[Math.floor(Math.random() * TRIALS.length)] + "!";
    client.say(channel, `Your random track is ${tracks}`);
    return
  }

  if (commandName === "!joke") {
    var jokes = JOKE_DATA[Math.floor(Math.random() * JOKE_DATA.length)] + "!";
    client.say(channel, `${jokes}`);
    return
  }
	
  if (commandName === "!lvl1") {
    var tracks = LEVEL_1[Math.floor(Math.random() * LEVEL_1.length)];
    client.say(channel, `Your random level 1 is ${tracks}`);
    return
  }

  if (commandName === "!lvl2") {
    var tracks = LEVEL_2[Math.floor(Math.random() * LEVEL_2.length)];
    client.say(channel, `Your random level 2 is ${tracks}`);
    return
  }

  if (commandName === "!lvl3") {
    var tracks = LEVEL_3[Math.floor(Math.random() * LEVEL_3.length)];
    client.say(channel, `Your random level 3 is ${tracks}`);
    return
  }

  if (commandName === "!lvl4") {
    var tracks = LEVEL_4[Math.floor(Math.random() * LEVEL_4.length)];
    client.say(channel, `Your random level 4 is ${tracks}`);
    return
  }

  if (commandName === "!lvl5") {
    var tracks = LEVEL_5[Math.floor(Math.random() * LEVEL_5.length)];
    client.say(channel, `Your random level 5 is ${tracks}`);
    return
  }

  if (commandName === "!lvl6") {
    var tracks = LEVEL_6[Math.floor(Math.random() * LEVEL_6.length)];
    client.say(channel, `Your random level 6 is ${tracks}`);
    return
  }

  if (commandName === "!lvl7") {
    var tracks = LEVEL_7[Math.floor(Math.random() * LEVEL_7.length)];
    client.say(channel, `Your random level 7 is ${tracks}`);
    return
  }

  onMessageHandler(channel, userstate, message, self)
})

function onMessageHandler (channel, userstate, message, self) {
  checkTwitchChat(userstate, message, channel)
}

function onDisconnectedHandler(reason) {
  console.log(`Disconnected: ${reason}`)
}

function onConnectedHandler(address, port) {
  console.log(`Connected: ${address}:${port}`)
}

function onHostedHandler (channel, username, viewers, autohost) {
  client.say(channel,
    `Thank you @${username} for the host of ${viewers}!`
  )
}

function onRaidedHandler(channel, username, viewers) {
  client.say(channel,
    `Thank you @${username} for the raid of ${viewers}!`
  )
}

function onSubscriptionHandler(channel, username, method, message, userstate) {
  client.say(channel,
    `Thank you @${username} for subscribing!`
  )
}

function onCheerHandler(channel, userstate, message)  {
  client.say(channel,
    `Thank you @${userstate.username} for the ${userstate.bits} bits!`
  )
}

function onGiftPaidUpgradeHandler(channel, username, sender, userstate) {
  client.say(channel,
    `Thank you @${username} for continuing your gifted sub!`
  )
}

function onHostingHandler(channel, target, viewers) {
  client.say(channel,
    `We are now hosting ${target} with ${viewers} viewers!`
  )
}

function reconnectHandler () {
  console.log('Reconnecting...')
}

function resubHandler(channel, username, months, message, userstate, methods) {
  const cumulativeMonths = userstate['msg-param-cumulative-months']
  client.say(channel,
    `Thank you @${username} for the ${cumulativeMonths} sub!`
  )
}

function subGiftHandler(channel, username, streakMonths, recipient, methods, userstate) {

  client.say(channel,
    `Thank you @${username} for gifting a sub to ${recipient}}.`
  )

  // this comes back as a boolean from twitch, disabling for now
  // "msg-param-sender-count": false
  // const senderCount =  ~~userstate["msg-param-sender-count"];
  // client.say(channel,
  //   `${username} has gifted ${senderCount} subs!`
  // )
}

// commands

function commands (channel, userstate) {
  client.say(channel, `/me Command documentation can be found here: https://github.com/AUSrKrip/AUSr_Bot`)
}

function lurk (channel, userstate) {
  client.say(channel, `@${userstate.username}, Activated lurk mode`)
}

function discord (channel, userstate) {
  client.say(channel, `@${userstate.username}, https://discord.gg/QUkEEvb 🎮`)
}

function coffee (channel, userstate) {
  client.say(channel, `@${userstate.username}, will BRB they need coffee stat.`)
}

function slurk (channel, userstate) {
  client.say(channel, `@${userstate.username}, Activated sleepy lurk mode ResidentSleeper `)
}

function checkTwitchChat(userstate, message, channel) {
  console.log(message)
  message = message.toLowerCase()
  let shouldSendMessage = false
  shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))
  if (shouldSendMessage) {
    // tell user
    client.say(channel, `@${userstate.username}, sorry!  Your message was deleted.`)
    // delete message
    client.deletemessage(channel, userstate.id)
  }
}
