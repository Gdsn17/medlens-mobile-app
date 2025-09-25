#!/bin/bash

# fix-emfile.sh - Fix EMFILE: too many open files, watch error on macOS
# This script fixes the React Native Metro bundler file watching issue

set -e  # Exit on any error

echo "🔧 Fixing EMFILE: too many open files, watch error on macOS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "This script is designed for macOS only"
    exit 1
fi

# 1. Install watchman if not already installed
print_status "Installing watchman..."
if ! command -v watchman &> /dev/null; then
    if command -v brew &> /dev/null; then
        brew install watchman
        print_success "Watchman installed successfully"
    else
        print_error "Homebrew not found. Please install Homebrew first:"
        echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
else
    print_success "Watchman is already installed"
fi

# 2. Update system-wide file limits
print_status "Updating system-wide file limits..."

# Create temporary file for sysctl configuration
TEMP_SYSCTL="/tmp/medlens_sysctl.conf"

# Check if limits are already set
CURRENT_MAXFILES=$(sysctl -n kern.maxfiles 2>/dev/null || echo "0")
CURRENT_MAXFILESPERPROC=$(sysctl -n kern.maxfilesperproc 2>/dev/null || echo "0")

if [ "$CURRENT_MAXFILES" -lt 524288 ] || [ "$CURRENT_MAXFILESPERPROC" -lt 524288 ]; then
    print_status "Setting kern.maxfiles and kern.maxfilesperproc to 524288..."
    
    # Set limits temporarily
    sudo sysctl -w kern.maxfiles=524288
    sudo sysctl -w kern.maxfilesperproc=524288
    
    # Make changes persistent
    echo "kern.maxfiles=524288" | sudo tee -a /etc/sysctl.conf > /dev/null
    echo "kern.maxfilesperproc=524288" | sudo tee -a /etc/sysctl.conf > /dev/null
    
    print_success "System-wide file limits updated"
else
    print_success "System-wide file limits are already set correctly"
fi

# 3. Update ulimit in ~/.zshrc
print_status "Updating ulimit in ~/.zshrc..."

# Check if ulimit is already set in .zshrc
if ! grep -q "ulimit -n 524288" ~/.zshrc 2>/dev/null; then
    echo "" >> ~/.zshrc
    echo "# MedLens: Increase file descriptor limit" >> ~/.zshrc
    echo "ulimit -n 524288" >> ~/.zshrc
    print_success "Added ulimit -n 524288 to ~/.zshrc"
else
    print_success "ulimit -n 524288 is already in ~/.zshrc"
fi

# 4. Reload configuration
print_status "Reloading configuration..."

# Source .zshrc to apply changes
if [ -f ~/.zshrc ]; then
    source ~/.zshrc
    print_success "Configuration reloaded"
else
    print_warning "~/.zshrc not found, please restart your terminal"
fi

# 5. Verify new limits
print_status "Verifying new limits..."

CURRENT_ULIMIT=$(ulimit -n)
CURRENT_MAXFILES=$(sysctl -n kern.maxfiles 2>/dev/null || echo "0")
CURRENT_MAXFILESPERPROC=$(sysctl -n kern.maxfilesperproc 2>/dev/null || echo "0")

echo ""
echo "📊 Current Limits:"
echo "  ulimit -n: $CURRENT_ULIMIT"
echo "  kern.maxfiles: $CURRENT_MAXFILES"
echo "  kern.maxfilesperproc: $CURRENT_MAXFILESPERPROC"

if [ "$CURRENT_ULIMIT" -ge 524288 ] && [ "$CURRENT_MAXFILES" -ge 524288 ] && [ "$CURRENT_MAXFILESPERPROC" -ge 524288 ]; then
    print_success "All limits are set correctly!"
else
    print_warning "Some limits may not be applied yet. Please restart your terminal and run this script again."
fi

# 6. Additional recommendations
echo ""
print_status "Additional recommendations:"
echo "  1. Restart your terminal to ensure all changes take effect"
echo "  2. If you're still getting EMFILE errors, try:"
echo "     - Close other applications that might be using many file descriptors"
echo "     - Restart your Mac to ensure all system changes take effect"
echo "     - Use 'npx expo start --tunnel' for Android testing"
echo "     - Use 'npx expo start --ios' for iOS Simulator testing"

echo ""
print_success "EMFILE fix script completed! 🎉"
echo "You can now run your React Native/Expo project without file watching issues."
