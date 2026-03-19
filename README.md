# @plainconcepts/n8n-nodes-compactifai

Use CompactifAi language models as an AI Model provider in n8n AI workflows.

This package provides one n8n community node:

- Multiverse CompactifAi (AI Language Model node)

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Installation

Follow the official community nodes installation guide:

- [Install community nodes in n8n](https://docs.n8n.io/integrations/community-nodes/installation/)

Package name:

- `@plainconcepts/n8n-nodes-compactifai`

## What This Node Does

The Multiverse CompactifAi node is an AI Language Model node that:

- Authenticates against CompactifAi using a bearer access token
- Loads available models dynamically from `GET /v1/models`
- Exposes the selected model to downstream AI nodes in n8n
- Supports common generation controls:
	- Temperature
	- Maximum Tokens
	- Frequency Penalty

## Credentials

Credential type:

- Multiverse Compactifai API

Required field:

- Access Token

How to configure:

1. Create a CompactifAi access token.
2. In n8n, create a new credential of type Multiverse Compactifai API.
3. Paste your token into Access Token.
4. Save and use it in the node.

The credential test calls:

- `GET https://api.compactif.ai/v1/models`

## Usage

Typical AI workflow setup:

1. Add the Multiverse CompactifAi node.
2. Select your credential.
3. Pick a model from the list (or provide a model ID with an expression).
4. Optionally tune Temperature, Maximum Tokens, and Frequency Penalty.
5. Connect this node output to an AI node that expects an AI Language Model.

Notes:

- Maximum Tokens set to `-1` means no explicit max token limit is sent.
- If your model list is empty, verify token validity and API access first.

## Compatibility

- Built with n8n Nodes API version `1`
- Intended for n8n versions that support AI Language Model node connections

If you run into compatibility issues, open an issue in the repository with your n8n version.

## Development

Project scripts:

- `npm run build` - Build the node
- `npm run dev` - Start development mode
- `npm run lint` - Lint the code
- `npm run lint:fix` - Lint and auto-fix
- `npm run release` - Run release flow

## Resources

- [CompactifAi API documentation](https://docs.compactif.ai/api_reference/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [n8n node development docs](https://docs.n8n.io/integrations/creating-nodes/)

## Version History

### 0.1.0

- Initial release
- Added Multiverse CompactifAi AI Language Model node
- Added CompactifAi access token credential
