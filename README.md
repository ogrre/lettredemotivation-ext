# Lettre de Motivation - Extension Navigateur

Extension navigateur dark mode compatible Chrome et Firefox pour générer automatiquement des lettres de motivation personnalisées grâce à l'IA OpenAI.

## 🎨 Design

Interface minimaliste inspirée de Raycast avec :
- Fond noir pur (#0a0a0a)
- Bordures fines grises
- Effets d'ombres inversées (inset)
- Animations fluides

## 🚀 Fonctionnalités

- 📝 Génération automatique de lettres de motivation personnalisées
- 🤖 Utilisation de l'API OpenAI (GPT-4o-mini)
- 📄 Import de CV au format PDF avec extraction automatique (pdf.js)
- 🌐 Support multilingue (Français et Anglais)
- 🎯 Personnalisation du nombre de caractères
- 📋 Copie automatique dans le presse-papier
- 💼 Compatible avec Indeed, Welcome to the Jungle, et autres sites d'emploi

## 📦 Installation

### Chrome / Brave

1. Clonez ou téléchargez ce repository
2. Ouvrez Chrome/Brave et allez dans `chrome://extensions/` ou `brave://extensions/`
3. Activez le "Mode développeur" en haut à droite
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier `lettre-de-motivation-extension`

### Firefox

1. Clonez ou téléchargez ce repository
2. Ouvrez Firefox et allez dans `about:debugging#/runtime/this-firefox`
3. Cliquez sur "Charger un module complémentaire temporaire"
4. Sélectionnez le fichier `manifest.json` dans le dossier `lettre-de-motivation-extension`

## ⚙️ Configuration

1. Cliquez sur l'icône de l'extension dans la barre d'outils
2. Cliquez sur l'icône d'engrenage en haut à droite
3. Renseignez les informations suivantes :
   - **Clé API OpenAI** : Obtenez-la sur [platform.openai.com](https://platform.openai.com/api-keys)
   - **CV** : Téléchargez votre CV au format PDF (extraction automatique du texte)
4. Cliquez sur "Enregistrer la configuration"

## 🎯 Utilisation

1. Naviguez vers un site d'offre d'emploi
2. Cliquez sur l'icône de l'extension
3. Collez la description du poste dans le champ principal
4. Choisissez la langue (🇫🇷 Français ou 🇬🇧 English)
5. Définissez le nombre de caractères maximum
6. Cliquez sur "Générer ma lettre de motivation"
7. Une modale s'affiche avec le résultat
8. Cliquez sur "Copier et fermer" pour copier le texte dans le presse-papier

## 🛠️ Développement

### Installation des dépendances

```bash
npm install
```

### Scripts disponibles

```bash
# Tests
npm test                    # Lancer les tests
npm run test:watch         # Tests en mode watch
npm run test:coverage      # Tests avec rapport de couverture

# Linting
npm run lint               # Vérifier le code
npm run lint:fix          # Corriger automatiquement les erreurs

# Formatage
npm run format             # Formater le code
npm run format:check      # Vérifier le formatage

# Validation complète
npm run validate          # Lint + format + tests + coverage

# Build
npm run build             # Build l'extension pour distribution

# Lancement
npm run start:firefox     # Lancer dans Firefox
npm run start:chrome      # Lancer dans Chrome
```

### Structure du projet

```
lettre-de-motivation-extension/
├── manifest.json              # Configuration de l'extension
├── popup.html                 # Interface utilisateur
├── styles.css                 # Styles dark mode
├── scripts/
│   ├── popup.js              # Logique de l'interface
│   ├── background.js         # Gestion des appels API
│   └── content.js            # Interaction avec les pages web
├── lib/                      # Bibliothèques externes (pdf.js)
├── tests/                    # Tests unitaires
│   ├── setup.js             # Configuration des tests
│   ├── popup.test.js        # Tests du popup
│   └── background.test.js   # Tests du background
├── jest.config.js            # Configuration Jest
├── .eslintrc.json           # Configuration ESLint
├── .prettierrc.json         # Configuration Prettier
└── README.md
```

## 🧪 Tests et Qualité du Code

- **Jest** : Tests unitaires avec couverture de code
- **ESLint** : Linting du code JavaScript
- **Prettier** : Formatage automatique du code
- **Coverage** : Seuil minimum de 70% sur toutes les métriques

## 🔐 Sécurité

- Votre clé API est stockée localement dans votre navigateur
- Aucune donnée n'est envoyée à des serveurs tiers (sauf OpenAI)
- Le CV est extrait et stocké en texte dans le stockage local du navigateur

## 💰 Coûts

L'utilisation de cette extension nécessite une clé API OpenAI et génère des coûts selon votre usage. Le modèle utilisé est `gpt-4o-mini` pour optimiser les coûts.

## 📝 Prompt optimisé

L'extension utilise un prompt sophistiqué qui :
- Analyse votre CV et identifie les compétences pertinentes
- Examine la description du poste pour comprendre les besoins
- Génère un texte authentique et personnalisé
- Évite les clichés et formules génériques
- Respecte la limite de caractères
- Supprime automatiquement les formules de politesse

## 🐛 Problèmes connus

- L'extraction PDF fonctionne pour la plupart des PDFs, mais certains formats complexes peuvent poser problème
- La couverture de tests doit être améliorée (actuellement à 0%)

## 🚧 Roadmap

- [ ] Améliorer la couverture de tests
- [ ] Ajouter plus de langues
- [ ] Sauvegarder l'historique des lettres générées
- [ ] Ajouter des templates personnalisables
- [ ] Support des formats de CV autres que PDF

## 📄 Licence

MIT License

## 👨‍💻 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

Créé avec ❤️ pour faciliter la recherche d'emploi
