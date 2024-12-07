# AI Hakeem Lukman Telegraf Bot

This bot is built on bun and will likely not work with node

To install dependencies:

```bash
bun install
```

To run:

Create a new file called `.env` in the root of the project with the following content:

```shell
TELEGRAM_BOT_TOKEN=youBotToken
GROQ_API_KEY=yourApiKey
```

and then run

```bash
bun start
```

You may need to use a VPN to start the bot as it talks to the telegram API
