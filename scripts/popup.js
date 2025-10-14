// === Navigation entre pages ===
const settingsBtn = document.getElementById('settings-btn');
const backBtn = document.getElementById('back-btn');
const mainContainer = document.querySelector('.container');
const settingsPage = document.getElementById('settings-page');
const resultModal = document.getElementById('result-modal');
const btnLoader = document.querySelector('.btn-loader');
const errorBanner = document.getElementById('error-message');
const configMessage = document.getElementById('config-message');

// Initialiser les états d'affichage
if (mainContainer) mainContainer.style.display = 'flex';
if (settingsPage) settingsPage.style.display = 'none';
if (resultModal) resultModal.style.display = 'none';
if (btnLoader) btnLoader.style.display = 'none';
if (errorBanner) errorBanner.style.display = 'none';
if (configMessage) configMessage.style.display = 'none';

// Initialiser la langue et traduire l'interface
initLanguage().then(() => {
  updateUI();
});

console.log('Settings button:', settingsBtn);
console.log('Back button:', backBtn);
console.log('Main container:', mainContainer);
console.log('Settings page:', settingsPage);

if (settingsBtn) {
  settingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Settings button clicked!');
    if (mainContainer) {
      mainContainer.style.display = 'none';
    }
    if (settingsPage) {
      settingsPage.style.display = 'flex';
    }
  });
} else {
  console.error('Settings button not found!');
}

if (backBtn) {
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Back button clicked!');
    if (settingsPage) {
      settingsPage.style.display = 'none';
    }
    if (mainContainer) {
      mainContainer.style.display = 'flex';
    }
  });
} else {
  console.error('Back button not found!');
}

// Bouton bug report
const bugBtn = document.getElementById('bug-btn');
if (bugBtn) {
  bugBtn.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://github.com/votre-repo/issues' });
  });
}

// === Sélecteurs de langue personnalisés ===
const languageBtn = document.getElementById('language-btn');
const languageDropdown = document.getElementById('language-dropdown');
const languageInput = document.getElementById('language');

const interfaceLanguageBtn = document.getElementById('interface-language-btn');
const interfaceLanguageDropdown = document.getElementById('interface-language-dropdown');
const interfaceLanguageInput = document.getElementById('interfaceLanguage');

const languages = {
  fr: { flag: '🇫🇷', text: 'Français' },
  en: { flag: '🇬🇧', text: 'English' }
};

// Sélecteur de langue pour la lettre
languageBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  languageDropdown.classList.toggle('show');
});

document.querySelectorAll('#language-dropdown .dropdown-item').forEach(item => {
  item.addEventListener('click', (e) => {
    const value = e.currentTarget.dataset.value;
    const lang = languages[value];

    languageBtn.querySelector('.flag').textContent = lang.flag;
    languageBtn.querySelector('.text').textContent = lang.text;
    languageInput.value = value;

    languageDropdown.classList.remove('show');
  });
});

// Sélecteur de langue de l'interface
if (interfaceLanguageBtn) {
  interfaceLanguageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    interfaceLanguageDropdown.classList.toggle('show');
  });

  document.querySelectorAll('#interface-language-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', async (e) => {
      const value = e.currentTarget.dataset.value;
      const lang = languages[value];

      interfaceLanguageBtn.querySelector('.flag').textContent = lang.flag;
      interfaceLanguageBtn.querySelector('.text').textContent = lang.text;
      interfaceLanguageInput.value = value;

      interfaceLanguageDropdown.classList.remove('show');

      // Changer la langue de l'interface
      await setLanguage(value);
    });
  });
}

// Fermer les dropdowns en cliquant ailleurs
document.addEventListener('click', () => {
  languageDropdown.classList.remove('show');
  if (interfaceLanguageDropdown) {
    interfaceLanguageDropdown.classList.remove('show');
  }
});

// === Détecter la langue automatiquement ===
async function detectLanguage() {
  try {
    // 1. Vérifier la langue du navigateur
    const browserLang = navigator.language || navigator.userLanguage;
    const isFrench = browserLang.toLowerCase().startsWith('fr');

    // 2. Vérifier la langue de la page active
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let pageLang = null;

    if (tab && tab.id) {
      try {
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'getPageLanguage' });
        pageLang = response?.language;
      } catch (e) {
        // Impossible d'obtenir la langue de la page (normal sur certaines pages système)
      }
    }

    // 3. Déterminer la langue finale
    const isPageFrench = pageLang?.toLowerCase().startsWith('fr');
    const detectedLang = (isFrench || isPageFrench) ? 'fr' : 'en';

    return detectedLang;
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'en'; // Par défaut anglais
  }
}

// === Charger la configuration ===
async function loadConfig() {
  const config = await chrome.storage.local.get(['apiKey', 'cvUploaded', 'cvText', 'language', 'maxChars', 'interfaceLanguage']);

  if (config.apiKey) {
    document.getElementById('apiKey').value = config.apiKey;
  }

  if (config.cvUploaded && config.cvText) {
    document.getElementById('cv-status').textContent = t('cvStatusOk');
    document.getElementById('cv-status').style.color = '#10b981';
  }

  // Détecter la langue si elle n'est pas déjà configurée
  let selectedLang = config.language;
  if (!selectedLang) {
    selectedLang = await detectLanguage();
  }

  const lang = languages[selectedLang];
  if (lang) {
    languageBtn.querySelector('.flag').textContent = lang.flag;
    languageBtn.querySelector('.text').textContent = lang.text;
    languageInput.value = selectedLang;
  }

  if (config.maxChars) {
    document.getElementById('maxChars').value = config.maxChars;
  }

  // Charger la langue de l'interface
  if (config.interfaceLanguage && interfaceLanguageBtn) {
    const interfaceLang = languages[config.interfaceLanguage];
    if (interfaceLang) {
      interfaceLanguageBtn.querySelector('.flag').textContent = interfaceLang.flag;
      interfaceLanguageBtn.querySelector('.text').textContent = interfaceLang.text;
      interfaceLanguageInput.value = config.interfaceLanguage;
    }
  }
}

// === Gestion du fichier PDF ===
document.getElementById('cvFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    document.getElementById('file-label-text').textContent = file.name;
  }
});

// === Enregistrer la configuration ===
document.getElementById('config-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const apiKey = document.getElementById('apiKey').value;
  const cvFile = document.getElementById('cvFile').files[0];

  try {
    const config = { apiKey };

    // Extraire le texte du PDF si un nouveau fichier est sélectionné
    if (cvFile) {
      showConfigMessage(t('infoCvExtraction'), 'info');

      const cvData = await readFileAsArrayBuffer(cvFile);
      const cvText = await extractTextFromPDF(cvData);

      // Stocker seulement le texte extrait (pas l'ArrayBuffer)
      config.cvText = cvText;
      config.cvName = cvFile.name;
      config.cvUploaded = true;
    }

    await chrome.storage.local.set(config);

    showConfigMessage(t('successConfig'), 'success');
    document.getElementById('cv-status').textContent = t('cvStatusOk');
    document.getElementById('cv-status').style.color = '#10b981';

    // Retourner à la page principale après 1 seconde
    setTimeout(() => {
      settingsPage.style.display = 'none';
      mainContainer.style.display = 'flex';
    }, 1000);
  } catch (error) {
    showConfigMessage(`Erreur : ${error.message}`, 'error');
  }
});

// === Lire le fichier PDF ===
function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// === Extraire le texte du PDF avec pdf.js ===
async function extractTextFromPDF(arrayBuffer) {
  try {
    // Charger pdf.js
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'lib/pdf.worker.min.js';

    // Charger le PDF
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';

    // Extraire le texte de chaque page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Erreur lors de l\'extraction du PDF:', error);
    throw new Error('Impossible d\'extraire le texte du PDF. Assurez-vous que le fichier est valide.');
  }
}

// === Générer la lettre de motivation ===
document.getElementById('generate-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const jobDescription = document.getElementById('jobDescription').value.trim();
  const language = document.getElementById('language').value;
  const maxChars = parseInt(document.getElementById('maxChars').value);

  if (!jobDescription) {
    showError(t('errorNoDescription'));
    return;
  }

  // Vérifier la configuration
  const config = await chrome.storage.local.get(['apiKey', 'cvText']);

  if (!config.apiKey || !config.cvText) {
    showError(t('errorNoConfig'));
    setTimeout(() => {
      mainContainer.style.display = 'none';
      settingsPage.style.display = 'flex';
    }, 2000);
    return;
  }

  // Afficher le loading
  const generateBtn = document.querySelector('.btn-generate');
  const generateIcon = document.getElementById('generate-icon');
  const generateText = document.getElementById('generate-text');
  const btnLoader = document.querySelector('.btn-loader');

  generateBtn.disabled = true;
  generateIcon.style.display = 'none';
  generateText.style.display = 'none';
  btnLoader.style.display = 'flex';
  hideError();

  try {
    // Envoyer la demande au background script
    const response = await chrome.runtime.sendMessage({
      action: 'generateCoverLetter',
      data: {
        jobDescription,
        cvText: config.cvText,
        language,
        maxChars
      }
    });

    if (response.success) {
      showResultModal(response.coverLetter);
    } else {
      showError(response.error || t('errorGeneration'));
    }
  } catch (error) {
    showError(`${t('errorGeneration')} : ${error.message}`);
  } finally {
    generateBtn.disabled = false;
    generateIcon.style.display = 'block';
    generateText.style.display = 'inline';
    btnLoader.style.display = 'none';
  }
});

// === Afficher la modale de résultat ===
function showResultModal(text) {
  const modal = document.getElementById('result-modal');
  const resultText = document.getElementById('result-text');
  const charCount = document.getElementById('result-char-count');

  resultText.textContent = text;
  charCount.textContent = text.length;

  modal.style.display = 'flex';

  // Animation d'entrée
  setTimeout(() => {
    modal.querySelector('.modal-content').style.transform = 'scale(1)';
    modal.querySelector('.modal-content').style.opacity = '1';
  }, 10);
}

// === Fermer la modale ===
function closeModal() {
  const modal = document.getElementById('result-modal');
  const modalContent = modal.querySelector('.modal-content');

  // Animation de sortie
  modalContent.style.transform = 'scale(0.95)';
  modalContent.style.opacity = '0';

  setTimeout(() => {
    modal.style.display = 'none';
    modalContent.style.transform = 'scale(0.95)';
  }, 200);
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-overlay').addEventListener('click', closeModal);

// === Copier et fermer ===
document.getElementById('copy-btn').addEventListener('click', async () => {
  const text = document.getElementById('result-text').textContent;

  try {
    await navigator.clipboard.writeText(text);

    // Feedback visuel
    const copyText = document.getElementById('copy-text');
    const originalText = copyText.textContent;
    copyText.textContent = t('copied');

    setTimeout(() => {
      closeModal();
      // Réinitialiser après fermeture
      setTimeout(() => {
        copyText.textContent = originalText;
      }, 300);
    }, 500);
  } catch (error) {
    showError(t('errorCopy'));
  }
});

// === Messages d'erreur ===
function showError(message) {
  const errorBanner = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');

  errorText.textContent = message;
  errorBanner.style.display = 'flex';

  setTimeout(() => {
    hideError();
  }, 5000);
}

function hideError() {
  const errorBanner = document.getElementById('error-message');
  errorBanner.style.display = 'none';
}

// === Messages de configuration ===
function showConfigMessage(message, type) {
  const messageEl = document.getElementById('config-message');
  messageEl.textContent = message;
  messageEl.className = `message ${type}`;
  messageEl.style.display = 'block';

  if (type === 'success') {
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 3000);
  }
}

// === Charger pdf.js ===
const script = document.createElement('script');
script.src = 'lib/pdf.min.js';
document.head.appendChild(script);

// === Initialisation ===
loadConfig();
