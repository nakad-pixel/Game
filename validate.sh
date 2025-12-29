#!/bin/bash

echo "🎮 Idle Anime Ascension - Project Validation"
echo "=============================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Check Node.js
echo -n "📦 Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Found $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    ((errors++))
fi

# Check npm
echo -n "📦 Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} Found v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    ((errors++))
fi

# Check if node_modules exists
echo -n "📦 Checking dependencies... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Dependencies not installed. Run: npm install"
    ((warnings++))
fi

# Check critical files
echo ""
echo "📁 Checking Critical Files:"

files=(
    "package.json"
    "tsconfig.json"
    "vite.config.ts"
    "index.html"
    "src/main.ts"
    "src/App.vue"
    "src/stores/gameStore.ts"
    "src/stores/uiStore.ts"
    "README.md"
)

for file in "${files[@]}"; do
    echo -n "  $file... "
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC} Missing"
        ((errors++))
    fi
done

# Check components
echo ""
echo "🎨 Checking Vue Components:"
components=(
    "GameCanvas.vue"
    "HUD.vue"
    "SettingsMenu.vue"
    "ProgressionUI.vue"
    "ShopMenu.vue"
    "CharacterSelect.vue"
    "AchievementGrid.vue"
    "LoadingScreen.vue"
    "NotificationContainer.vue"
)

for component in "${components[@]}"; do
    echo -n "  $component... "
    if [ -f "src/components/$component" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC} Missing"
        ((errors++))
    fi
done

# Check systems
echo ""
echo "⚙️  Checking Game Systems:"
systems=(
    "CombatSystem.ts"
    "RenderingSystem.ts"
    "PersistenceSystem.ts"
    "ProgressionSystem.ts"
)

for system in "${systems[@]}"; do
    echo -n "  $system... "
    if [ -f "src/systems/$system" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC} Missing"
        ((errors++))
    fi
done

# Check data files
echo ""
echo "📊 Checking Data Files:"
datafiles=(
    "traits.json"
    "achievements.json"
    "events.json"
    "battlepass.json"
)

for datafile in "${datafiles[@]}"; do
    echo -n "  $datafile... "
    if [ -f "src/data/$datafile" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC} Missing"
        ((errors++))
    fi
done

# Check backend
echo ""
echo "🖥️  Checking Backend:"
echo -n "  server.js... "
if [ -f "backend/server.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC} Missing (optional)"
    ((warnings++))
fi

# Check public files
echo ""
echo "🌐 Checking Public Files:"
publicfiles=(
    "manifest.json"
    "service-worker.js"
    "privacy-policy.html"
    "terms-of-service.html"
)

for publicfile in "${publicfiles[@]}"; do
    echo -n "  $publicfile... "
    if [ -f "public/$publicfile" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${YELLOW}⚠${NC} Missing"
        ((warnings++))
    fi
done

# Check documentation
echo ""
echo "📚 Checking Documentation:"
docs=(
    "README.md"
    "DEPLOYMENT.md"
    "CONTRIBUTING.md"
    "PROJECT_SUMMARY.md"
    "QUICKSTART.md"
    "LAUNCH_CHECKLIST.md"
)

for doc in "${docs[@]}"; do
    echo -n "  $doc... "
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${YELLOW}⚠${NC} Missing"
        ((warnings++))
    fi
done

# Run type check if dependencies are installed
if [ -d "node_modules" ]; then
    echo ""
    echo "🔍 Running TypeScript Check..."
    if npm run type-check > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} TypeScript compilation successful"
    else
        echo -e "${RED}✗${NC} TypeScript errors found. Run: npm run type-check"
        ((errors++))
    fi
fi

# Summary
echo ""
echo "=============================================="
echo "📊 Validation Summary:"
echo ""

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo "🚀 Project is ready for development and deployment!"
    exit 0
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}⚠ $warnings warnings${NC}"
    echo "Project is functional but some optional files are missing."
    exit 0
else
    echo -e "${RED}✗ $errors errors, $warnings warnings${NC}"
    echo "Please fix the errors before proceeding."
    exit 1
fi
