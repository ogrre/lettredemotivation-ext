# Cover Letter Generator - Browser Extension

A browser extension for Chrome and Firefox that automatically generates personalized cover letters using AI (OpenAI GPT-4o-mini).

## 🎨 Design

Minimalist dark mode interface inspired by Raycast:
- Pure black background (#0a0a0a)
- Thin gray borders
- Inverted shadow effects (inset)
- Smooth animations

## 🚀 Features

- 📝 Automatic generation of personalized cover letters
- 🤖 Powered by OpenAI API (GPT-4o-mini)
- 📄 PDF resume import with automatic text extraction (pdf.js)
- 🌐 Multilingual support for generated letters (French and English)
- 🌍 Interface available in French and English (automatic browser language detection)
- 🎯 Customizable character count
- 📋 Automatic clipboard copy
- 💼 Compatible with Indeed, Welcome to the Jungle, and other job sites

## 🛠️ How It Works

1. **Setup**: Configure your OpenAI API key and upload your resume (PDF) in the settings
2. **Generate**: Paste the job description, select the language and character count
3. **Get Your Letter**: The AI analyzes your resume and the job posting to create a tailored cover letter
4. **Copy & Apply**: Click to copy the letter and paste it directly into job applications

## 📦 Installation

### Chrome / Brave

1. Clone or download this repository
2. Open Chrome/Brave and go to `chrome://extensions/` or `brave://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `lettredemotivation-ext` folder

### Firefox

1. Clone or download this repository
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file in the `lettredemotivation-ext` folder

## ⚙️ Configuration

1. Click the extension icon in the toolbar
2. Click the gear icon (top right)
3. Enter the following information:
   - **OpenAI API Key**: Get one at [platform.openai.com](https://platform.openai.com/api-keys)
   - **Resume**: Upload your resume in PDF format (automatic text extraction)
   - **Interface Language**: Choose between French and English (auto-detected by default)
4. Click "Save configuration"

## 🎯 Usage

1. Navigate to a job listing website
2. Click the extension icon
3. Paste the job description in the main field
4. Choose the language (🇫🇷 French or 🇬🇧 English)
5. Set the maximum number of characters
6. Click "Generate my cover letter"
7. A modal appears with the result
8. Click "Copy and close" to copy the text to your clipboard

## 🧪 Development

### Installation

```bash
npm install
```

### Available Scripts

```bash
# Tests
npm test                    # Run tests
npm run test:watch         # Tests in watch mode
npm run test:coverage      # Tests with coverage report

# Linting
npm run lint               # Check code
npm run lint:fix          # Auto-fix errors

# Formatting
npm run format             # Format code
npm run format:check      # Check formatting

# Full validation
npm run validate          # Lint + format + tests + coverage

# Build
npm run build             # Build extension for distribution

# Launch
npm run start:firefox     # Launch in Firefox
npm run start:chrome      # Launch in Chrome
```

### Project Structure

```
lettredemotivation-ext/
├── manifest.json              # Extension configuration
├── popup.html                 # User interface
├── styles.css                 # Dark mode styles
├── scripts/
│   ├── popup.js              # Interface logic
│   ├── background.js         # API calls handler
│   ├── content.js            # Web page interaction
│   └── i18n.js               # Internationalization system
├── lib/                      # External libraries (pdf.js)
├── tests/                    # Unit tests
│   ├── setup.js             # Test configuration
│   ├── popup.test.js        # Popup tests
│   └── background.test.js   # Background tests
├── jest.config.js            # Jest configuration
├── .eslintrc.json           # ESLint configuration
├── .prettierrc.json         # Prettier configuration
└── README.md
```

## 🧪 Tests and Code Quality

- **Jest**: Unit tests with code coverage
- **ESLint**: JavaScript linting
- **Prettier**: Automatic code formatting
- **Coverage**: Minimum threshold of 70% on all metrics

## 🔐 Security

- Your API key is stored locally in your browser
- No data is sent to third-party servers (except OpenAI)
- Your resume is extracted and stored as text in the browser's local storage

## 💰 Costs

Using this extension requires an OpenAI API key and generates costs based on your usage. The model used is `gpt-4o-mini` to optimize costs.

## 📝 Optimized Prompt

The extension uses a sophisticated prompt that:
- Analyzes your resume and identifies relevant skills
- Examines the job description to understand requirements
- Generates authentic and personalized text
- Avoids clichés and generic phrases
- Respects the character limit
- Automatically removes greeting and closing formulas

## 🌐 Links

- **Website**: [lettredemotivation.app](https://www.lettredemotivation.app)
- **Report a bug**: [GitHub Issues](https://github.com/ogrre/lettredemotivation-ext/issues)
- **Developed by**: [Black Betta](https://betta.black)

## 📄 License

MIT License

## 👨‍💻 Contributing

Contributions are welcome! Feel free to open an issue or pull request.

---

© 2024 [lettredemotivation.app](https://www.lettredemotivation.app) - All rights reserved
Developed with ❤️ by [Black Betta](https://betta.black)
