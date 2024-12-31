# AI Hakeem Lukman Telegraf Bot

This bot is built on bun and will need it to work.

## To install dependencies

```bash
bun install
```

## To run

Create a new file or copy `.env.example` to a file called `.env` in the root of the project with the following content:

```shell
TELEGRAM_BOT_TOKEN=youBotToken
GROQ_API_KEY=yourApiKey
IMAGINE_API_KEY=yourApiKey
```

You can get all of these API keys for free from their respective sources.

after that you can then run with

```bash
bun start
```

You may need to use a VPN to start the bot as it talks to the telegram API
