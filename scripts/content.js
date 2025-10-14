// Content script pour interagir avec la page web

// Écouter les messages du popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'insertText') {
    insertTextIntoActiveElement(request.text);
    sendResponse({ success: true });
  } else if (request.action === 'getPageLanguage') {
    // Détecter la langue de la page
    const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('xml:lang');
    const metaLang = document.querySelector('meta[http-equiv="content-language"]')?.content;
    const language = htmlLang || metaLang || 'en';
    sendResponse({ language });
  }
  return true;
});

// Insérer le texte dans l'élément actif
function insertTextIntoActiveElement(text) {
  const activeElement = document.activeElement;

  // Vérifier si l'élément actif est un champ de texte
  if (
    activeElement.tagName === 'TEXTAREA' ||
    (activeElement.tagName === 'INPUT' &&
     (activeElement.type === 'text' || activeElement.type === 'email'))
  ) {
    // Pour les inputs et textareas standards
    activeElement.value = text;
    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    activeElement.dispatchEvent(new Event('change', { bubbles: true }));
  } else if (activeElement.contentEditable === 'true') {
    // Pour les éditeurs contentEditable (comme certains formulaires modernes)
    activeElement.textContent = text;
    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    activeElement.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    // Essayer de trouver le champ le plus proche
    const textArea = document.querySelector('textarea:focus, input[type="text"]:focus');
    if (textArea) {
      textArea.value = text;
      textArea.dispatchEvent(new Event('input', { bubbles: true }));
      textArea.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // En dernier recours, copier dans le presse-papier
      navigator.clipboard.writeText(text);
      alert('Texte copié dans le presse-papier. Collez-le manuellement dans le champ souhaité.');
    }
  }
}

// Ajouter un indicateur visuel pour les champs de texte détectés
function highlightTextFields() {
  const textFields = document.querySelectorAll('textarea, input[type="text"], [contenteditable="true"]');

  textFields.forEach(field => {
    field.addEventListener('focus', () => {
      field.style.outline = '2px solid #3b82f6';
    });

    field.addEventListener('blur', () => {
      field.style.outline = '';
    });
  });
}

// Initialiser au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', highlightTextFields);
} else {
  highlightTextFields();
}
