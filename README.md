# Send4Me v2

The bot is [live here](https://t.me/Send4Me2Bot)!

This is v2 of the [Send4Me](https://github.com/szenius/send4me) project. It is a Telegram bot that automates sending of recurring polls.

## Commands

### `/add`

Add a recurring poll.

```text
/add <description of poll> <option 1> <option 2> ... <option N> <day of week>

// Example
/add "What does everyone want to eat this week?" "Pizza" "Fried chicken" "Sushi" mon
```

- Do note that only normal quotes `"` are accepted.
- Day of week: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat` or `Sun`

### `/chatid`

Bot will reply with the chat ID.

### `/hi`

Bot will say Hi back to you!

### `/list`

List the active recurring polls in your chat.

### `/remove`

Bot will list the active recurring polls in your chat. Choose the one you want to remove.

### `/start`

Bot will share example usage of the bot.
