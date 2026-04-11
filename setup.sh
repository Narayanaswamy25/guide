#!/bin/bash
# Development Quick Start Script for Career Compass

echo "🚀 Career Compass - Local Development Setup"
echo "==========================================\n"

# Check Node.js
echo "✓ Checking Node.js..."
node --version

# Check npm
echo "✓ Checking npm..."
npm --version

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "\n📦 Installing dependencies..."
    npm install
fi

echo "\n🔧 Available Commands:"
echo "  npm run dev             - Start development server"
echo "  npm run build           - Build for production"
echo "  npm run type-check      - Check TypeScript"
echo "  npm run lint            - Run ESLint"
echo "  npm run lint:fix        - Auto-fix linting"
echo "  npm run format          - Format code"
echo "  npm run format:check    - Check formatting"

echo "\n📝 Setting up environment..."
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Don't forget to add GEMINI_API_KEY to .env"
fi

echo "\n✅ Setup complete!"
echo "Run 'npm run dev' to start developing"
