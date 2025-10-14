#!/bin/bash

# Script de build pour l'extension Chrome/Firefox
# Ce script crée un package propre dans le dossier release

set -e

echo "🔨 Build de l'extension Lettre de Motivation..."

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Nettoyer le dossier release
echo "${BLUE}📦 Nettoyage du dossier release...${NC}"
rm -rf ../release
mkdir -p ../release

# Créer un dossier temporaire pour le build
TEMP_DIR=$(mktemp -d)
echo "${BLUE}📂 Création du package dans ${TEMP_DIR}...${NC}"

# Copier les fichiers nécessaires (exclure node_modules, tests, etc.)
rsync -av \
  --exclude='node_modules' \
  --exclude='tests' \
  --exclude='coverage' \
  --exclude='.git' \
  --exclude='.DS_Store' \
  --exclude='*.log' \
  --exclude='scripts/build.sh' \
  --exclude='scripts/build-firefox.sh' \
  --exclude='jest.config.js' \
  --exclude='package-lock.json' \
  --exclude='.eslintrc.json' \
  --exclude='.eslintignore' \
  --exclude='.prettierrc.json' \
  --exclude='.prettierignore' \
  --exclude='generate-icons.html' \
  ./ "$TEMP_DIR/"

# Obtenir la version depuis manifest.json
VERSION=$(grep -o '"version": "[^"]*' manifest.json | cut -d'"' -f4)

# Créer l'archive ZIP pour Chrome Web Store
ZIP_NAME="lettredemotivation-ext-v${VERSION}.zip"
echo "${BLUE}📦 Création de ${ZIP_NAME}...${NC}"
cd "$TEMP_DIR"
zip -r "../release/${ZIP_NAME}" ./* -x "*.git*" "*.DS_Store"
cd - > /dev/null

# Nettoyer le dossier temporaire
rm -rf "$TEMP_DIR"

echo "${GREEN}✅ Build terminé !${NC}"
echo "${GREEN}📦 Package disponible : ../release/${ZIP_NAME}${NC}"
echo ""
echo "Prochaines étapes :"
echo "  1. Chrome Web Store: Uploader ../release/${ZIP_NAME}"
echo "  2. Firefox Add-ons: Uploader ../release/${ZIP_NAME}"
echo ""
echo "Note: Les fichiers .pem et .crx sont automatiquement ignorés par git"
