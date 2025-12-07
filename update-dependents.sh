#!/bin/bash

# Script to build schema and update it in dependent projects
# Usage: ./update-dependents.sh
# Environment variables:
#   AUTO_RESTART=true    - Automatically restart backend server
#   DRY_RUN=true         - Only show what would be done
#   SKIP_VALIDATOR=true  - Skip validator package update

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
SKIP_VALIDATOR=${SKIP_VALIDATOR:-false}

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/../formfiller-backend"
FRONTEND_DIR="$SCRIPT_DIR/../formfiller-frontend"
VALIDATOR_DIR="$SCRIPT_DIR/../formfiller-validator"

# Logging functions
log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC}  $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_step() { echo -e "${BLUE}▶${NC} $1"; }

echo ""
echo "=========================================="
echo "  FormFiller Schema Distribution"
echo "=========================================="
echo ""
if [ "$DRY_RUN" = "true" ]; then
  log_warn "DRY RUN MODE - No actual changes will be made"
  echo ""
fi

# Step 1: Build the schema package
log_step "Step 1: Building formfiller-schema..."
cd "$SCRIPT_DIR"

if [ "$DRY_RUN" = "false" ]; then
  npm run build
  if [ $? -ne 0 ]; then
      log_error "Build failed!"
      exit 1
  fi
  
  # Pack the schema
  npm pack
  if [ $? -ne 0 ]; then
      log_error "Pack failed!"
      exit 1
  fi
  
  # Get version and package filename
  VERSION=$(node -p "require('./package.json').version")
  PACKAGE_FILE="formfiller-schema-${VERSION}.tgz"
  
  log_info "Schema built and packed: ${PACKAGE_FILE}"
else
  VERSION=$(node -p "require('./package.json').version")
  PACKAGE_FILE="formfiller-schema-${VERSION}.tgz"
  log_info "[DRY RUN] Would build and pack: ${PACKAGE_FILE}"
fi
echo ""

# Step 2: Update backend
log_step "Step 2: Updating backend..."
if [ -d "$BACKEND_DIR" ]; then
    cd "$BACKEND_DIR"
    
    if [ "$DRY_RUN" = "false" ]; then
        # Clear all caches and old schema
        log_info "Clearing backend caches..."
        rm -rf dist/ node_modules/formfiller-schema node_modules/.cache
        
        # Copy and install new schema package
        log_info "Installing ${PACKAGE_FILE}..."
        cp "../formfiller-schema/${PACKAGE_FILE}" .
        npm install "./${PACKAGE_FILE}"
        
        if [ $? -ne 0 ]; then
            log_error "Backend install failed!"
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
        # Clear all caches
        log_info "Clearing frontend caches..."
        rm -rf node_modules/formfiller-schema node_modules/.cache build/
        
        # Copy and install new schema package
        log_info "Installing ${PACKAGE_FILE}..."
        cp "../formfiller-schema/${PACKAGE_FILE}" .
        npm install "./${PACKAGE_FILE}"
        
        if [ $? -ne 0 ]; then
            log_error "Frontend install failed!"
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

# Step 4: Update validator
if [ "$SKIP_VALIDATOR" = "false" ]; then
    log_step "Step 4: Updating validator..."
    if [ -d "$VALIDATOR_DIR" ]; then
        cd "$VALIDATOR_DIR"
        
        if [ "$DRY_RUN" = "false" ]; then
            # Clear caches
            log_info "Clearing validator caches..."
            rm -rf dist/ node_modules/formfiller-schema
            
            # Copy and install new schema package
            log_info "Installing ${PACKAGE_FILE}..."
            cp "../formfiller-schema/${PACKAGE_FILE}" .
            npm install "./${PACKAGE_FILE}"
            
            if [ $? -ne 0 ]; then
                log_error "Validator install failed!"
                exit 1
            fi
            
            # Rebuild validator
            log_info "Rebuilding validator..."
            npm run build
            
            if [ $? -ne 0 ]; then
                log_error "Validator build failed!"
                exit 1
            fi
            
            log_info "Validator updated successfully"
        else
            log_info "[DRY RUN] Would update validator at ${VALIDATOR_DIR}"
        fi
    else
        log_warn "Validator directory not found at $VALIDATOR_DIR"
    fi
    echo ""
else
    log_warn "Skipping validator update (SKIP_VALIDATOR=true)"
    echo ""
fi

# Step 5: Verify installation
log_step "Step 5: Verifying installation..."
echo ""

if [ "$DRY_RUN" = "false" ]; then
    if [ -d "$BACKEND_DIR" ]; then
        echo "  Backend schema version:"
        cd "$BACKEND_DIR"
        npm list formfiller-schema | grep formfiller-schema || echo "     Not found"
    fi

    if [ -d "$FRONTEND_DIR" ]; then
        echo ""
        echo "  Frontend schema version:"
        cd "$FRONTEND_DIR"
        npm list formfiller-schema | grep formfiller-schema || echo "     Not found"
    fi
    
    if [ "$SKIP_VALIDATOR" = "false" ] && [ -d "$VALIDATOR_DIR" ]; then
        echo ""
        echo "  Validator schema version:"
        cd "$VALIDATOR_DIR"
        npm list formfiller-schema | grep formfiller-schema || echo "     Not found"
    fi
fi

echo ""
echo "=========================================="
log_info "Schema distribution completed!"
echo "=========================================="
echo ""
echo "📋 Summary:"
echo "   - Schema package built and packed"
echo "   - Backend updated (caches cleared)"
echo "   - Frontend updated (caches cleared)"
if [ "$SKIP_VALIDATOR" = "false" ]; then
    echo "   - Validator updated"
fi
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

