# Send4Me v2

This is v2 of the [Send4Me](https://github.com/szenius/send4me) project. It is a Telegram bot that automates sending of recurring polls.

Bot will be linked once it's ready.

## Commands

The full list of commands are as follows:

- [`/addpoll`](#addpoll)
- [`/chatid`](#chatid)
- [`/hi`](#hi)

### `/addpoll`

Add a recurring poll.

```
/addpoll <description of poll> <option 1> <option 2> ... <option N> <day of week> <hour>

// Example
/addpoll "What shall we have for dinner next week?" Pizza "Fried chicken" Tacos Sun 1000
```

- Do note that only normal quotes `"` are accepted.
- Day of week: `mon`, `tue`, `wed`, `thu`, `fri`, `sat` or `sun`
- Hour: in 24h format

### `/chatid`

Bot will reply with the chat ID.

### `/hi`

Bot will say Hi back to you!
