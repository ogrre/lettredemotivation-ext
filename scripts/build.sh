#!/bin/bash

# Script de build pour l'extension Chrome/Firefox
# Ce script crée un package propre dans le dossier release

set -e

echo "🔨 Build de l'extension Lettre de Motivation..."

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_DIR=$(pwd)
RELEASE_DIR="$PROJECT_DIR/../release"

# Nettoyer le dossier release
echo "${BLUE}📦 Nettoyage du dossier release...${NC}"
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR"

# Créer un dossier temporaire pour le build
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT
echo "${BLUE}📂 Création du package dans ${TEMP_DIR}...${NC}"

# Copier uniquement les fichiers nécessaires à l'exécution de l'extension,
# en conservant l'arborescence attendue par manifest.json.
rsync -a manifest.json popup.html styles.css "$TEMP_DIR/"
rsync -a --exclude='build.sh' scripts/ "$TEMP_DIR/scripts/"
rsync -a lib/ "$TEMP_DIR/lib/"
rsync -a \
  --exclude='ICON_INSTRUCTIONS.md' \
  --exclude='icon.svg' \
  --exclude='icon32.png' \
  --exclude='icon64.png' \
  icons/ "$TEMP_DIR/icons/"

# Obtenir la version depuis manifest.json
VERSION=$(node -e "console.log(JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')).version)")

# Créer l'archive ZIP pour Chrome Web Store
ZIP_NAME="lettredemotivation-ext-v${VERSION}.zip"
echo "${BLUE}📦 Création de ${ZIP_NAME}...${NC}"
cd "$TEMP_DIR"
zip -qr "$RELEASE_DIR/${ZIP_NAME}" . -x "*.git*" "*.DS_Store"
cd "$PROJECT_DIR" > /dev/null

echo "${GREEN}✅ Build terminé !${NC}"
echo "${GREEN}📦 Package disponible : ${RELEASE_DIR}/${ZIP_NAME}${NC}"
echo ""
echo "Prochaines étapes :"
echo "  1. Chrome Web Store: Uploader ../release/${ZIP_NAME}"
echo "  2. Firefox Add-ons: Uploader ../release/${ZIP_NAME}"
echo ""
echo "Note: Les fichiers .pem et .crx sont automatiquement ignorés par git"
