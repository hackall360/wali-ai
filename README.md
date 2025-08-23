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
| `DISCORD_BOT_TOKEN` | Discord bot token |
| `DISCORD_CLIENT_ID` | Application client ID |
| `DISCORD_GUILD_ID` | Optional: register commands to a single guild during development |
| `SECRET_TOKEN` | Optional: token used when requesting data from dune.gaming.tools |

The bot starts an embedded PostgreSQL instance automatically. No external database or AWS configuration is required.

## Self-hosting
Using the publicly hosted bot is recommended. Self-hosting is at your own risk and monetisation is not permitted.

## Contributing
Issues and pull requests are welcome.

## License
Distributed under the MIT with Additional Restrictions License. See [LICENSE](LICENSE) for more information.
