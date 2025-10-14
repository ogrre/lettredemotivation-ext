// Background script pour gérer les appels API OpenAI

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateCoverLetter') {
    generateCoverLetter(request.data)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Indique qu'on va répondre de manière asynchrone
  }
});

async function generateCoverLetter(data) {
  const { jobDescription, cvText, language, maxChars } = data;

  try {
    // Récupérer la clé API depuis le storage
    const config = await chrome.storage.local.get(['apiKey']);

    if (!config.apiKey) {
      throw new Error('Clé API OpenAI non configurée');
    }

    // Construire le prompt
    const prompt = buildPrompt(cvText, jobDescription, language, maxChars);

    // Appeler l'API OpenAI
    const coverLetter = await callOpenAI(config.apiKey, prompt, maxChars);

    return {
      success: true,
      coverLetter
    };
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

function buildPrompt(cvText, jobDescription, language, maxChars) {
  const lang = language === 'fr' ? 'français' : 'anglais';

  let prompt = '';

  if (language === 'fr') {
    prompt = `Tu es un expert en rédaction de lettres de motivation professionnelles. Ta tâche est de créer une lettre de motivation personnalisée, percutante et authentique.

**CONTRAINTES STRICTES :**
- Longueur maximale : ${maxChars} caractères
- Langue : ${lang}
- Format : Texte direct sans formule d'appel ni signature (pas de "Madame, Monsieur" ni de "Cordialement")
- Ton : Professionnel, enthousiaste mais naturel, éviter les clichés

**MON CV :**
${cvText}

**DESCRIPTION DU POSTE :**
${jobDescription}

**INSTRUCTIONS :**
1. Analyse mon CV et identifie mes compétences et expériences les plus pertinentes pour ce poste
2. Identifie les exigences clés et les valeurs de l'entreprise dans la description du poste
3. Crée une lettre de motivation qui :
   - Montre ma compréhension du poste et de l'entreprise
   - Met en avant mes expériences les plus pertinentes avec des exemples concrets
   - Démontre ma valeur ajoutée unique pour ce poste
   - Exprime ma motivation de manière authentique et spécifique
   - Utilise un vocabulaire professionnel mais accessible
   - Évite les formules génériques et les clichés

**FORMAT DE SORTIE :**
Rédige uniquement le corps de la lettre, en 2-3 paragraphes concis. Ne commence pas par "Madame, Monsieur" et ne termine pas par une formule de politesse. Le texte doit être directement utilisable dans un formulaire en ligne.

**IMPORTANT :** Respecte impérativement la limite de ${maxChars} caractères.`;
  } else {
    prompt = `You are an expert in writing professional cover letters. Your task is to create a personalized, impactful, and authentic cover letter.

**STRICT CONSTRAINTS:**
- Maximum length: ${maxChars} characters
- Language: ${lang}
- Format: Direct text without greeting or signature (no "Dear Sir/Madam" or "Sincerely")
- Tone: Professional, enthusiastic but natural, avoid clichés

**MY RESUME:**
${cvText}

**JOB DESCRIPTION:**
${jobDescription}

**INSTRUCTIONS:**
1. Analyze my resume and identify my most relevant skills and experiences for this position
2. Identify key requirements and company values in the job description
3. Create a cover letter that:
   - Shows my understanding of the position and the company
   - Highlights my most relevant experiences with concrete examples
   - Demonstrates my unique value proposition for this role
   - Expresses my motivation authentically and specifically
   - Uses professional but accessible vocabulary
   - Avoids generic phrases and clichés

**OUTPUT FORMAT:**
Write only the body of the letter, in 2-3 concise paragraphs. Don't start with "Dear Sir/Madam" and don't end with a closing formula. The text should be directly usable in an online form.

**IMPORTANT:** Strictly respect the ${maxChars} character limit.`;
  }

  return prompt;
}

async function callOpenAI(apiKey, prompt, maxChars) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Tu es un expert en rédaction de lettres de motivation. Tu crées des lettres concises, percutantes et personnalisées.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: Math.ceil(maxChars * 1.5), // Marge pour la génération
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Erreur API OpenAI');
  }

  const result = await response.json();
  let coverLetter = result.choices[0].message.content.trim();

  // Nettoyer les éventuelles formules de politesse résiduelles
  coverLetter = cleanCoverLetter(coverLetter);

  // Tronquer si nécessaire
  if (coverLetter.length > maxChars) {
    coverLetter = coverLetter.substring(0, maxChars).trim();
    // Essayer de couper à la dernière phrase complète
    const lastPeriod = coverLetter.lastIndexOf('.');
    if (lastPeriod > maxChars * 0.8) {
      coverLetter = coverLetter.substring(0, lastPeriod + 1);
    }
  }

  return coverLetter;
}

function cleanCoverLetter(text) {
  // Supprimer les formules de politesse communes
  const greetings = [
    /^(Madame,?\s*Monsieur,?\s*)/i,
    /^(Dear\s+Sir\/Madam,?\s*)/i,
    /^(Dear\s+Hiring\s+Manager,?\s*)/i,
    /^(To\s+Whom\s+It\s+May\s+Concern,?\s*)/i,
  ];

  const closings = [
    /\s*(Cordialement,?\s*)$/i,
    /\s*(Bien\s+cordialement,?\s*)$/i,
    /\s*(Sincèrement,?\s*)$/i,
    /\s*(Sincerely,?\s*)$/i,
    /\s*(Best\s+regards,?\s*)$/i,
    /\s*(Kind\s+regards,?\s*)$/i,
  ];

  let cleaned = text;

  // Supprimer les formules d'appel
  for (const pattern of greetings) {
    cleaned = cleaned.replace(pattern, '');
  }

  // Supprimer les formules de fermeture
  for (const pattern of closings) {
    cleaned = cleaned.replace(pattern, '');
  }

  return cleaned.trim();
}
