#!/bin/bash

set -e

# === Config ===
PACKAGE_NAME=$(node -p "require('./package.json').name.replace('@', '').replace('/', '-')")
PACKAGE_VERSION=$(node -p "require('./package.json').version")
ZIP_NAME="${PACKAGE_NAME}-${PACKAGE_VERSION}.zip"
RELEASE_DIR="./releases"
ZIP_PATH="$RELEASE_DIR/$ZIP_NAME"

# === Create release dir if not exists ===
mkdir -p "$RELEASE_DIR"

# === Clean previous zip (optional) ===
rm -f "$ZIP_PATH"

# === Create zip ===
echo "📦 Creating release: $ZIP_NAME"

zip -r "$ZIP_PATH" \
  dist/api.js \
  dist/app.js \
  package.json \
  README.md \
  README.ar_SA.md \
  LICENSE

echo "✅ Done: $ZIP_PATH"
