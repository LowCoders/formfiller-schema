#!/bin/bash

# Script to sync schema changes to dependent projects using GitHub packages
# Usage: ./sync-dependents.sh
# Environment variables:
#   AUTO_RESTART=true    - Automatically restart backend server
#   DRY_RUN=true         - Only show what would be done
#   SKIP_PUSH=true       - Skip git push (for local testing)

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration from environment
DRY_RUN=${DRY_RUN:-false}
AUTO_RESTART=${AUTO_RESTART:-false}
SKIP_PUSH=${SKIP_PUSH:-false}

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/../formfiller-backend"
FRONTEND_DIR="$SCRIPT_DIR/../formfiller-frontend"

# Logging functions
log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC}  $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_step() { echo -e "${BLUE}▶${NC} $1"; }

echo ""
echo "=========================================="
echo "  FormFiller Schema Sync (GitHub)"
echo "=========================================="
echo ""
if [ "$DRY_RUN" = "true" ]; then
  log_warn "DRY RUN MODE - No actual changes will be made"
  echo ""
fi

# Step 1: Build and commit schema changes
log_step "Step 1: Building formfiller-schema..."
cd "$SCRIPT_DIR"

if [ "$DRY_RUN" = "false" ]; then
  # Build the schema
  npm run build
  if [ $? -ne 0 ]; then
      log_error "Build failed!"
      exit 1
  fi
  log_info "Schema built successfully"
  
  # Check for uncommitted changes
  if git diff --quiet && git diff --staged --quiet; then
    log_info "No changes to commit"
  else
    # Commit changes
    git add -A
    VERSION=$(node -p "require('./package.json').version")
    git commit -m "chore: update schema v${VERSION}" || true
    log_info "Changes committed"
    
    if [ "$SKIP_PUSH" = "false" ]; then
      git push
      log_info "Changes pushed to GitHub"
    else
      log_warn "Skipping push (SKIP_PUSH=true)"
    fi
  fi
else
  VERSION=$(node -p "require('./package.json').version")
  log_info "[DRY RUN] Would build, commit and push schema v${VERSION}"
fi
echo ""

# Step 2: Update backend
log_step "Step 2: Updating backend..."
if [ -d "$BACKEND_DIR" ]; then
    cd "$BACKEND_DIR"
    
    if [ "$DRY_RUN" = "false" ]; then
        # Clear caches and reinstall from GitHub
        log_info "Clearing backend caches..."
        rm -rf node_modules/formfiller-schema node_modules/.cache
        
        # Update packages from GitHub
        log_info "Updating formfiller packages from GitHub..."
        npm update formfiller-schema formfiller-validator formfiller-types
        
        if [ $? -ne 0 ]; then
            log_error "Backend update failed!"
            exit 1
        fi
        
        # Rebuild backend
        log_info "Rebuilding backend..."
        npm run build
        
        if [ $? -ne 0 ]; then
            log_error "Backend build failed!"
            exit 1
        fi
        
        # Stop running backend server (graceful)
        log_info "Stopping backend server..."
        pkill -SIGTERM -f "ts-node-dev.*server.ts" 2>/dev/null || true
        pkill -SIGTERM -f "node.*formfiller-backend" 2>/dev/null || true
        sleep 2
        
        # Auto-restart if requested
        if [ "$AUTO_RESTART" = "true" ]; then
            log_info "Starting backend server..."
            npm run dev > backend.log 2>&1 &
            sleep 3
            if pgrep -f "ts-node-dev.*server.ts" > /dev/null; then
                log_info "Backend server restarted successfully"
            else
                log_warn "Backend server may not have started correctly. Check backend.log"
            fi
        else
            log_warn "Backend stopped. Run 'npm run dev' to restart manually"
        fi
    else
        log_info "[DRY RUN] Would update backend at ${BACKEND_DIR}"
    fi
else
    log_warn "Backend directory not found at $BACKEND_DIR"
fi
echo ""

# Step 3: Update frontend
log_step "Step 3: Updating frontend..."
if [ -d "$FRONTEND_DIR" ]; then
    cd "$FRONTEND_DIR"
    
    if [ "$DRY_RUN" = "false" ]; then
        # Clear caches
        log_info "Clearing frontend caches..."
        rm -rf node_modules/formfiller-schema node_modules/formfiller-validator node_modules/formfiller-types node_modules/.cache
        
        # Update packages from GitHub
        log_info "Updating formfiller packages from GitHub..."
        npm update formfiller-schema formfiller-validator formfiller-types
        
        if [ $? -ne 0 ]; then
            log_error "Frontend update failed!"
            exit 1
        fi
        
        log_info "Frontend updated successfully"
        log_warn "Frontend: Refresh browser to reload with new schema"
    else
        log_info "[DRY RUN] Would update frontend at ${FRONTEND_DIR}"
    fi
else
    log_warn "Frontend directory not found at $FRONTEND_DIR"
fi
echo ""

# Step 4: Verify installation
log_step "Step 4: Verifying installation..."
echo ""

if [ "$DRY_RUN" = "false" ]; then
    if [ -d "$BACKEND_DIR" ]; then
        echo "  Backend packages:"
        cd "$BACKEND_DIR"
        npm list formfiller-schema formfiller-validator formfiller-types 2>/dev/null | grep formfiller || echo "     Not found"
    fi

    if [ -d "$FRONTEND_DIR" ]; then
        echo ""
        echo "  Frontend packages:"
        cd "$FRONTEND_DIR"
        npm list formfiller-schema formfiller-validator formfiller-types 2>/dev/null | grep formfiller || echo "     Not found"
    fi
fi

echo ""
echo "=========================================="
log_info "Schema sync completed!"
echo "=========================================="
echo ""
echo "📋 Summary:"
echo "   - Schema built and pushed to GitHub"
echo "   - Backend updated from GitHub"
echo "   - Frontend updated from GitHub"
echo ""

if [ "$AUTO_RESTART" = "true" ]; then
    log_info "Backend server was automatically restarted"
else
    log_warn "IMPORTANT: Restart servers for changes to take effect!"
    echo ""
    echo "💡 To restart:"
    echo "   Backend:  cd $BACKEND_DIR && npm run dev"
    echo "   Frontend: Refresh browser (Vite will reload automatically)"
fi
echo ""

