# Instructions pour les icônes

Cette extension nécessite 3 icônes aux formats suivants :

- `icon16.png` : 16x16 pixels
- `icon48.png` : 48x48 pixels
- `icon128.png` : 128x128 pixels

## Créer les icônes

Vous pouvez créer les icônes de plusieurs façons :

### Option 1 : Utiliser un générateur en ligne

1. Allez sur [favicon.io](https://favicon.io/) ou [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Choisissez un design avec le thème "lettre" ou "document"
3. Générez et téléchargez les icônes aux bonnes dimensions
4. Renommez-les selon les noms ci-dessus

### Option 2 : Créer avec un outil de design

Utilisez Figma, Canva, ou tout autre outil de design pour créer une icône avec :
- Symbole : 📝 ou un document
- Couleurs : Bleu (#3b82f6) et blanc
- Style : Moderne et minimaliste

### Option 3 : Utiliser des emojis

En attendant, vous pouvez utiliser des emojis convertis en images :
1. Allez sur [emojitopng.com](https://emojitopng.com/)
2. Choisissez l'emoji 📝
3. Téléchargez aux dimensions requises

### Option 4 : Créer avec ImageMagick (ligne de commande)

```bash
# Installer ImageMagick si nécessaire
brew install imagemagick  # macOS
apt-get install imagemagick  # Linux

# Créer une icône simple
convert -size 128x128 xc:white -font Arial -pointsize 80 \
  -fill "#3b82f6" -gravity center -annotate +0+0 "📝" \
  icon128.png

convert icon128.png -resize 48x48 icon48.png
convert icon128.png -resize 16x16 icon16.png
```

## Placement des fichiers

Une fois créées, placez les 3 fichiers PNG dans ce dossier `icons/`.
