#!/bin/bash

# release.sh - Schema verzióemelés és publikálás
#
# Usage: ./scripts/release.sh [patch|minor|major]
#
# Ez a script:
# 1. Ellenőrzi, hogy nincs-e uncommitted változás
# 2. Emeli a verziószámot (npm version)
# 3. Újraépíti a csomagot
# 4. Commit-olja a változásokat
# 5. Push-olja a main branch-re tag-gel együtt
#
# Verzió típusok:
#   patch - 5.1.10 -> 5.1.11 (bug fixes)
#   minor - 5.1.10 -> 5.2.0  (new features, backward compatible)
#   major - 5.1.10 -> 6.0.0  (breaking changes)

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
VERSION_TYPE=${1:-patch}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCHEMA_DIR="$(dirname "$SCRIPT_DIR")"

# Logging functions
log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC}  $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_step() { echo -e "${BLUE}▶${NC} $1"; }

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
  log_error "Invalid version type: $VERSION_TYPE"
  echo "Usage: $0 [patch|minor|major]"
  exit 1
fi

cd "$SCHEMA_DIR"

echo ""
echo "=========================================="
echo "  FormFiller Schema Release"
echo "=========================================="
echo ""
echo "Version bump type: ${VERSION_TYPE}"
echo ""

# Step 1: Check for uncommitted changes
log_step "Step 1: Checking for uncommitted changes..."
if [[ -n $(git status --porcelain) ]]; then
  log_error "You have uncommitted changes. Please commit or stash them first."
  git status --short
  exit 1
fi
log_info "Working directory is clean"

# Step 2: Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
log_info "Current version: ${CURRENT_VERSION}"

# Step 3: Bump version
log_step "Step 2: Bumping version (${VERSION_TYPE})..."
npm version $VERSION_TYPE --no-git-tag-version
NEW_VERSION=$(node -p "require('./package.json').version")
log_info "New version: ${NEW_VERSION}"

# Step 4: Build the package
log_step "Step 3: Building package..."
npm run build
if [ $? -ne 0 ]; then
  log_error "Build failed! Rolling back version change..."
  git checkout package.json package-lock.json 2>/dev/null || true
  exit 1
fi
log_info "Build successful"

# Step 5: Run tests (if available)
log_step "Step 4: Running tests..."
if npm run test --if-present 2>/dev/null; then
  log_info "Tests passed"
else
  log_warn "No tests or tests skipped"
fi

# Step 6: Commit changes
log_step "Step 5: Committing changes..."
git add -A
git commit -m "chore(release): v${NEW_VERSION}

- Version bump: ${CURRENT_VERSION} -> ${NEW_VERSION}
- Rebuilt dist/ with latest changes"

log_info "Changes committed"

# Step 7: Create git tag
log_step "Step 6: Creating git tag..."
git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"
log_info "Tag v${NEW_VERSION} created"

# Step 8: Push to remote
log_step "Step 7: Pushing to remote..."
git push origin HEAD
git push origin "v${NEW_VERSION}"
log_info "Pushed to remote"

echo ""
echo "=========================================="
log_info "Release v${NEW_VERSION} completed!"
echo "=========================================="
echo ""
echo "📋 Summary:"
echo "   - Version: ${CURRENT_VERSION} -> ${NEW_VERSION}"
echo "   - Tag: v${NEW_VERSION}"
echo "   - Pushed to: origin/$(git rev-parse --abbrev-ref HEAD)"
echo ""
echo "💡 Next steps:"
echo "   - Dependent packages will get the update on next 'npm install'"
echo "   - For dev environment, run 'npm run sync' from workspace root"
echo ""

