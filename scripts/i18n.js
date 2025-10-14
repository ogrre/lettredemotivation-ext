// Système d'internationalisation pour l'extension

const translations = {
  fr: {
    // Header principal
    appTitle: '📝 Lettre de Motivation',

    // Page principale
    jobDescriptionLabel: 'Description du poste',
    jobDescriptionPlaceholder: 'Collez ici la description complète du poste que vous visez...',
    languageLabel: 'Langue',
    maxCharsLabel: 'Caractères max',
    generateButton: 'Générer ma lettre de motivation',

    // Page settings
    backButton: 'Retour',
    apiKeyLabel: 'Clé API OpenAI',
    apiKeyPlaceholder: 'sk-proj-...',
    apiKeyHelp: 'Obtenir une clé API',
    cvLabel: 'CV (PDF)',
    cvPlaceholder: 'Choisir un fichier PDF',
    cvStatusNone: 'Aucun CV enregistré',
    cvStatusOk: '✓ CV enregistré',
    saveButton: 'Enregistrer la configuration',

    // Messages
    errorNoDescription: 'Veuillez saisir une description de poste',
    errorNoConfig: 'Veuillez d\'abord configurer votre clé API et votre CV',
    errorGeneration: 'Une erreur est survenue lors de la génération',
    errorCopy: 'Erreur lors de la copie dans le presse-papier',
    successConfig: 'Configuration enregistrée avec succès !',
    infoCvExtraction: 'Extraction du CV en cours...',

    // Modal résultat
    modalTitle: 'Lettre générée',
    modalChars: 'caractères',
    copyButton: 'Copier et fermer',
    copied: '✓ Copié !',

    // Footer
    footerCopyright: '© 2024',
    footerRights: '- Tous droits réservés',
    footerDevelopedBy: 'Développé par',

    // Tooltips
    settingsTooltip: 'Configuration',
    bugTooltip: 'Signaler un bug',
    closeTooltip: 'Fermer',

    // Sélecteur de langue
    interfaceLanguageLabel: 'Langue de l\'interface',
    french: 'Français',
    english: 'English'
  },

  en: {
    // Header principal
    appTitle: '📝 Cover Letter',

    // Page principale
    jobDescriptionLabel: 'Job Description',
    jobDescriptionPlaceholder: 'Paste here the full description of the position you are applying for...',
    languageLabel: 'Language',
    maxCharsLabel: 'Max characters',
    generateButton: 'Generate my cover letter',

    // Page settings
    backButton: 'Back',
    apiKeyLabel: 'OpenAI API Key',
    apiKeyPlaceholder: 'sk-proj-...',
    apiKeyHelp: 'Get an API key',
    cvLabel: 'Resume (PDF)',
    cvPlaceholder: 'Choose a PDF file',
    cvStatusNone: 'No resume saved',
    cvStatusOk: '✓ Resume saved',
    saveButton: 'Save configuration',

    // Messages
    errorNoDescription: 'Please enter a job description',
    errorNoConfig: 'Please configure your API key and resume first',
    errorGeneration: 'An error occurred during generation',
    errorCopy: 'Error copying to clipboard',
    successConfig: 'Configuration saved successfully!',
    infoCvExtraction: 'Extracting resume...',

    // Modal résultat
    modalTitle: 'Letter generated',
    modalChars: 'characters',
    copyButton: 'Copy and close',
    copied: '✓ Copied!',

    // Footer
    footerCopyright: '© 2024',
    footerRights: '- All rights reserved',
    footerDevelopedBy: 'Developed by',

    // Tooltips
    settingsTooltip: 'Settings',
    bugTooltip: 'Report a bug',
    closeTooltip: 'Close',

    // Sélecteur de langue
    interfaceLanguageLabel: 'Interface Language',
    french: 'Français',
    english: 'English'
  }
};

// Langue par défaut
let currentLanguage = 'en';

// Détecter la langue du navigateur
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

// Initialiser la langue
async function initLanguage() {
  const stored = await chrome.storage.local.get(['interfaceLanguage']);
  if (stored.interfaceLanguage) {
    currentLanguage = stored.interfaceLanguage;
  } else {
    currentLanguage = detectBrowserLanguage();
    await chrome.storage.local.set({ interfaceLanguage: currentLanguage });
  }
  return currentLanguage;
}

// Obtenir une traduction
function t(key) {
  return translations[currentLanguage]?.[key] || translations['en'][key] || key;
}

// Changer la langue
async function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    await chrome.storage.local.set({ interfaceLanguage: lang });
    updateUI();
  }
}

// Mettre à jour l'interface avec les traductions
function updateUI() {
  // Header
  const appTitle = document.querySelector('header h1');
  if (appTitle) appTitle.textContent = t('appTitle');

  // Page principale
  const jobDescLabel = document.querySelector('label[for="jobDescription"]');
  if (jobDescLabel) {
    const required = jobDescLabel.querySelector('.required');
    jobDescLabel.innerHTML = `${t('jobDescriptionLabel')} `;
    if (required) jobDescLabel.appendChild(required);
  }

  const jobDescTextarea = document.getElementById('jobDescription');
  if (jobDescTextarea) jobDescTextarea.placeholder = t('jobDescriptionPlaceholder');

  const langLabel = document.querySelector('label[for="language"]');
  if (langLabel) langLabel.textContent = t('languageLabel');

  const maxCharsLabel = document.querySelector('label[for="maxChars"]');
  if (maxCharsLabel) maxCharsLabel.textContent = t('maxCharsLabel');

  const generateBtn = document.getElementById('generate-text');
  if (generateBtn) generateBtn.textContent = t('generateButton');

  // Settings page
  const apiKeyLabel = document.querySelector('label[for="apiKey"]');
  if (apiKeyLabel) {
    const required = apiKeyLabel.querySelector('.required');
    apiKeyLabel.innerHTML = `${t('apiKeyLabel')} `;
    if (required) apiKeyLabel.appendChild(required);
  }

  const apiKeyInput = document.getElementById('apiKey');
  if (apiKeyInput) apiKeyInput.placeholder = t('apiKeyPlaceholder');

  const apiKeyHelp = document.querySelector('label[for="apiKey"] + .help-text a');
  if (apiKeyHelp) apiKeyHelp.textContent = t('apiKeyHelp');

  const cvLabel = document.querySelector('label[for="cvFile"]');
  if (cvLabel) {
    const required = cvLabel.querySelector('.required');
    cvLabel.innerHTML = `${t('cvLabel')} `;
    if (required) cvLabel.appendChild(required);
  }

  const cvLabelText = document.getElementById('file-label-text');
  if (cvLabelText && cvLabelText.textContent !== cvLabelText.dataset.filename) {
    cvLabelText.textContent = t('cvPlaceholder');
  }

  const saveBtn = document.querySelector('.btn-save');
  if (saveBtn) {
    const icon = saveBtn.querySelector('svg');
    saveBtn.innerHTML = '';
    if (icon) saveBtn.appendChild(icon);
    saveBtn.appendChild(document.createTextNode(t('saveButton')));
  }

  // Interface language label (si présent)
  const interfaceLangLabel = document.querySelector('label[for="interfaceLanguage"]');
  if (interfaceLangLabel) {
    interfaceLangLabel.textContent = t('interfaceLanguageLabel');
  }

  // Modal
  const modalTitle = document.querySelector('.modal-header h3');
  if (modalTitle) {
    const charCount = document.getElementById('result-char-count');
    const count = charCount ? charCount.textContent : '0';
    if (modalTitle.textContent.includes('•')) {
      modalTitle.innerHTML = `${t('modalTitle')} • <span id="result-char-count">${count}</span> ${t('modalChars')}`;
    }
  }

  const copyBtn = document.getElementById('copy-text');
  if (copyBtn && !copyBtn.textContent.includes('✓')) {
    copyBtn.textContent = t('copyButton');
  }

  // Footer
  const footerText = document.querySelector('.footer-text');
  if (footerText) {
    const link = footerText.querySelector('a');
    const linkHref = link ? link.href : 'https://www.lettredemotivation.app';
    const linkText = link ? link.textContent : 'lettredemotivation.app';
    footerText.innerHTML = `${t('footerCopyright')} <a href="${linkHref}" target="_blank">${linkText}</a> ${t('footerRights')}`;
  }

  const footerCredits = document.querySelector('.footer-credits');
  if (footerCredits) {
    const link = footerCredits.querySelector('a');
    const linkHref = link ? link.href : 'https://betta.black';
    const linkText = link ? link.textContent : 'Black Betta';
    footerCredits.innerHTML = `${t('footerDevelopedBy')} <a href="${linkHref}" target="_blank">${linkText}</a>`;
  }

  // Tooltips
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) settingsBtn.title = t('settingsTooltip');

  const backBtn = document.getElementById('back-btn');
  if (backBtn) backBtn.title = t('backButton');

  const bugBtn = document.getElementById('bug-btn');
  if (bugBtn) bugBtn.title = t('bugTooltip');

  const modalClose = document.getElementById('modal-close');
  if (modalClose) modalClose.title = t('closeTooltip');
}

// Exporter pour utilisation dans popup.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { t, setLanguage, initLanguage, updateUI };
}
