#!/bin/bash

# Build script for Chrome Web Store

echo "🔨 Building extension for Chrome Web Store..."

# Create temporary build directory
BUILD_DIR="dist/chrome-package"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

echo "📦 Copying necessary files..."

# Copy essential files
cp manifest.json "$BUILD_DIR/"
cp popup.html "$BUILD_DIR/"
cp styles.css "$BUILD_DIR/"

# Copy directories
cp -r icons "$BUILD_DIR/"
cp -r scripts "$BUILD_DIR/"
cp -r lib "$BUILD_DIR/"

# Copy documentation
cp README.md "$BUILD_DIR/"
cp PRIVACY_POLICY.md "$BUILD_DIR/"

# Create LICENSE file
cat > "$BUILD_DIR/LICENSE" << 'EOF'
MIT License

Copyright (c) 2024 lettredemotivation.app

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

echo "🗜️  Creating ZIP archive..."

# Create ZIP file
cd dist
ZIP_NAME="lettredemotivation-ext-v1.0.0.zip"
zip -r "$ZIP_NAME" chrome-package/ -x "*.DS_Store" "*__MACOSX*"
cd ..

echo "✅ Build complete!"
echo "📦 Package ready: dist/$ZIP_NAME"
echo ""
echo "Next steps:"
echo "1. Go to https://chrome.google.com/webstore/devconsole"
echo "2. Click 'New Item'"
echo "3. Upload dist/$ZIP_NAME"
echo ""
