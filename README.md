# Lettre de Motivation — Browser Extension

The open-source browser extension behind [lettredemotivation.app](https://lettredemotivation.app).

## What this project does

The extension helps job seekers turn a job description and their own resume into a personalized cover letter. It runs in the browser and is designed to keep the user in control:

- the user provides their own OpenAI API key;
- the key, resume text and settings are stored locally in the browser;
- the extension sends the prompt to OpenAI only when a letter is generated;
- the project does not require an account on `lettredemotivation.app`.

The companion website is a separate project used to present the extension, document the project and publish the privacy and terms pages:
[github.com/ogrre/lettredemotivation-app](https://github.com/ogrre/lettredemotivation-app).

## Features

- personalized cover-letter generation with OpenAI;
- PDF resume import and text extraction with pdf.js;
- French and English interface and output;
- automatic language detection;
- configurable maximum character count;
- application draft persistence when the popup is closed;
- copy-to-clipboard result flow;
- popup interface aligned with the website's mint-and-dark visual identity;
- compatible with Chrome, Brave, Firefox and other supported Chromium browsers.

## How it works

1. Open the extension settings.
2. Add an OpenAI API key and upload a PDF resume.
3. Paste a job description in the popup.
4. Choose the output language and maximum length.
5. Generate the letter and copy it into the application form.

The extension does not provide an OpenAI account or API key. OpenAI usage is billed by OpenAI according to the user's account and API settings. Set spending limits on the OpenAI account before use.

## Installation

### Chrome, Brave and other Chromium browsers

For local development:

1. Clone or download this repository.
2. Open `chrome://extensions/` (or the equivalent page in your browser).
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `lettredemotivation-ext` directory — the directory containing `manifest.json`.

### Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Select `manifest.json` from this repository.

## Configuration

Open the extension popup and select the settings button. The configuration contains:

- an OpenAI API key;
- a PDF resume;
- the interface language;
- the language and maximum length for generated letters.

The job description and additional notes are saved as a local draft on each input, so closing the popup does not lose work.

The extension stores these values with the browser's local extension storage. Review the permissions in `manifest.json` before installing a development build.

## Development

Requirements: Node.js 22 or newer and npm.

```bash
git clone https://github.com/ogrre/lettredemotivation-ext.git
cd lettredemotivation-ext
npm install
```

Useful commands:

```bash
npm test                  # Run Jest tests
npm run test:coverage     # Run tests with coverage
npm run lint              # Lint extension scripts
npm run format:check      # Check Prettier formatting
npm run validate          # Run the full validation script
npm run build             # Build with web-ext
npm run build:release     # Create the release archive
npm run start:chrome      # Launch a Chromium development profile
npm run start:firefox     # Launch Firefox temporarily
```

The test suite currently covers the popup and background logic. The normal `npm test` command also enforces the repository's existing coverage thresholds; use `npx jest --coverage=false --runInBand` when you only need a local functional test run.

## Project structure

```text
lettredemotivation-ext/
├── manifest.json              # Extension metadata, permissions and icons
├── popup.html                 # Popup and settings markup
├── styles.css                 # Popup visual system
├── icons/
│   ├── icon.svg                # Source vector icon
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── scripts/
│   ├── popup.js                # Popup interactions and configuration
│   ├── background.js            # OpenAI request handling
│   ├── content.js               # Job-page integration
│   └── i18n.js                  # Interface translations
├── lib/                        # Bundled pdf.js files
├── tests/
├── package.json
└── README.md
```

## Security and privacy

This project is designed around local-first use, but the generated prompt and resume-derived content are sent to OpenAI when the user requests a letter. Do not use the extension with confidential information unless the user accepts OpenAI's applicable terms and privacy policy.

The project does not operate a user account system or a server-side database. Please report security issues privately through the repository contact options before opening a public issue.

## Contributing

Issues and pull requests are welcome. Please:

1. create a focused branch from `main`;
2. keep commits small and describe them in English;
3. run `npm run lint`, `npm run format:check` and the relevant tests;
4. describe browser and permission impacts in the pull request.

## Links

- Website: [lettredemotivation.app](https://lettredemotivation.app)
- Chrome Web Store: [Lettre de Motivation](https://chromewebstore.google.com/detail/lettre-de-motivation/dcopgcgecodhonbgmbiceieglcikjgli?hl=fr)
- Firefox Add-ons: [Lettre de Motivation](https://addons.mozilla.org/fr/firefox/addon/lettre-de-motivation/)
- Issues: [GitHub Issues](https://github.com/ogrre/lettredemotivation-ext/issues)
- Maintainer: [Black Betta](https://betta.black)

## License

This project is released under the [MIT License](LICENSE).
