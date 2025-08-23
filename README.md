# Wali the Dune Awekening Database Discord bot

[![License](https://img.shields.io/github/license/glazk0/wali)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/glazk0/wali.svg)](https://gitHub.com/glazk0/wali/graphs/contributors/)

A simple & user-friendly Discord bot integration of [dune.gaming.tools](https://dune.gaming.tools/) for Dune Awekening.

## Features

- **Easy to use**: Simple commands to get the information you need.
- **Fast**: Quick responses to your queries.

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [Contributing](#contributing)
- [Self-Hosting](#self-hosting)
- [Issues](#issues)
- [License](#license)

## Usage

1. [Invite](https://discord.com/oauth2/authorize?client_id=1370338761883259011) the bot to your Discord server and ensure it has the necessary permissions.
2. Make sure the .env file is configured correctly. (*Only if you are self-hosting*)
3. Start the bot using the installation instructions. (*Only if you are self-hosting*)

## Installation

> [!NOTE]  
> We recommend using our hosted version of Wali cause API access is not guaranteed for self-hosted instances.

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/glazk0/wali.git
```

2. Install dependencies

```bash
npm install
```

3. Copy the example config file and fill in the values

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

## Contributing

We welcome contributions from the community. If you have ideas for improvements or find issues, please open a pull request or submit an issue.

<a href="https://github.com/glazk0/wali/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=glazk0/wali" />
</a>

## Self-Hosting

The inclusion of the bot's source code herein is primarily intended to foster transparency and facilitate other developers in incorporating similar functionalities into their respective projects.

Given the inherent simplicity of the bot, utilizing the publicly-hosted version is generally sufficient for the majority of users. It is strongly recommended to employ the public version, unless specific reasons necessitate an alternative approach, such as for experimental purposes.

While users are granted the autonomy to host the bot on their own servers, it is imperative to note that support for self-hosted instances will not be provided. Undertaking self-hosting is at the sole risk and responsibility of the user. Moreover, any attempts to monetize the hosted bot are expressly prohibited. The bot is designed to serve the community and self hosted instances are prohibited from monetization.

## Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/glazk0/wali/issues/new/choose) on GitHub.

## License

Distributed under the MIT with Additional Restrictions License. See [LICENSE](LICENSE) for more information.
