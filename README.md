# Wali – Dune Awakening Database Discord bot

[![License](https://img.shields.io/github/license/glazk0/wali)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/glazk0/wali.svg)](https://github.com/glazk0/wali/graphs/contributors)

Wali brings the [dune.gaming.tools](https://dune.gaming.tools/) database to Discord.
Recent updates bundle an embedded PostgreSQL database and trim the configuration to only the essentials.

## Features
- Slash commands to search items, buildings, skills and more.
- Fast responses with caching.

## Installation
1. Clone the repository
   ```bash
   git clone https://github.com/glazk0/wali.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Copy the example config and fill in the values
   ```bash
   cp .env.example .env
   ```
4. Build the bot
   ```bash
   npm run build
   ```
5. Start the bot
   ```bash
   npm start
   ```

## Environment variables
| Variable | Description |
| --- | --- |
| `AI_CHANNEL_ID` | Optional: Discord channel ID for LLM responses |
| `DISCORD_BOT_TOKEN` | Discord bot token |
| `DISCORD_CLIENT_ID` | Application client ID |
| `DISCORD_GUILD_ID` | Optional: register commands to a single guild during development |
| `POLLINATIONS_TOKEN` | Optional: token used when requesting data from Pollinations |
| `SECRET_TOKEN` | Optional: token used when requesting data from dune.gaming.tools |

The bot starts an embedded PostgreSQL instance automatically. No external database or AWS configuration is required.

## AI channel workflow
When `AI_CHANNEL_ID` is set, Wali watches that Discord text channel for regular chat
messages. Each message is forwarded to [Pollinations](https://pollinations.ai) along
with a set of database tools. Pollinations may call these tools (which in turn use
`api.get` to query [dune.gaming.tools](https://dune.gaming.tools)) and then responds
back into the same channel.

### Pollinations requirements
- `POLLINATIONS_TOKEN` is optional but recommended for higher request limits.
- Outbound access to `https://text.pollinations.ai` must be allowed.

### Manual testing
1. Create a development guild and note the ID of a test channel.
2. Add `AI_CHANNEL_ID=<channelId>` and optionally `POLLINATIONS_TOKEN=<token>` to
   `.env`.
3. Run the bot with `npm run dev`.
4. Send a message such as `What does a Windtrap cost?` in the configured channel.
5. A Polli reply should appear with information fetched via the tools layer. Check
   the process logs if no response arrives.

## Self-hosting
Using the publicly hosted bot is recommended. Self-hosting is at your own risk and monetisation is not permitted.

## Contributing
Issues and pull requests are welcome.

## License
Distributed under the MIT with Additional Restrictions License. See [LICENSE](LICENSE) for more information.
