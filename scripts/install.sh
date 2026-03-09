#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo "==> Creating 'battery' group and adding $USER..."
sudo groupadd -f battery
sudo usermod -aG battery "$USER"

echo "==> Installing udev rules..."
sudo cp "$REPO_ROOT/udev/99-threshpad.rules" /etc/udev/rules.d/
sudo udevadm control --reload-rules
sudo udevadm trigger

echo "==> Installing GNOME extension..."
EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/threshpad@looselyhuman"
mkdir -p "$EXTENSION_DIR"
cp -r "$REPO_ROOT/extension/"* "$EXTENSION_DIR/"

# Compile GSettings schema
glib-compile-schemas "$EXTENSION_DIR/schemas/"

echo ""
echo "Done. Next steps:"
echo "  1. Log out and back in for group membership to take effect."
echo "  2. Enable the extension: gnome-extensions enable threshpad@looselyhuman"
