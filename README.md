<div align="center">
<img width="1200" height="475" alt="Guide Learning Platform" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Guide - Academic Learning Platform

Your comprehensive learning platform for academic excellence, assignment management, and educational goal tracking.

**Live Demo:** https://guide-learning.platform

## Features

✅ **Assignment Manager** - Organize and track assignments with kanban and list views  
✅ **Study Goals** - Build consistent learning habits with progress tracking  
✅ **Performance Analytics** - Track your academic progress in real-time  
✅ **Course Management** - Manage all your courses and academic requirements  
✅ **Degree Tracker** - Monitor your progress toward graduation  

## Quick Start

**Prerequisites:**  
- Node.js 18+ 
- npm 9+

**Installation:**

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment (optional for AI features):
   ```bash
   cp .env.example .env
   # Add GEMINI_API_KEY if using AI features
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open in browser:
   ```
   http://localhost:3000
   ```

## Available Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run type-check` - Check TypeScript types
- `npm run lint` - Run code linting
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Backend**: Firebase (Auth + Firestore)
- **Animations**: Motion
- **Charts**: Recharts

## Project Structure

```
src/
├── pages/          - Page components (Dashboard, Courses, etc.)
├── components/     - Reusable UI components
├── stores/         - Zustand state management
├── context/        - React Context (Authentication)
├── lib/            - Firebase configuration
└── utils/          - Helper functions
```

## Authentication

The platform uses Firebase authentication with Google Sign-In:

1. Click "Sign in with Google"
2. Complete authentication
3. Access your personalized learning dashboard

## Environment Variables

Create `.env` file in the root directory:

```env
GEMINI_API_KEY=your_api_key_here  # Optional: For AI-powered features
```

See `.env.example` for all available options.

## Development

### Code Quality

```bash
npm run type-check     # TypeScript validation
npm run lint           # ESLint checking
npm run format         # Prettier formatting
npm run lint:fix       # Auto-fix issues
```

### Browser DevTools

- Install **React DevTools** Chrome extension
- Open DevTools: `F12`
- Navigate to React tab for component inspection

## Deployment

### Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

### Deployment Options

- **Vercel** - Automatic deployment from GitHub
- **Firebase Hosting** - `firebase deploy`
- **Netlify** - Connect GitHub repository
- **Docker** - Containerized deployment

## Documentation

- [DEVELOPMENT.md](DEVELOPMENT.md) - Comprehensive development guide
- [COPY_STYLE_GUIDE.md](COPY_STYLE_GUIDE.md) - Brand voice and messaging guide
- [PROFESSIONAL_COPY_UPDATES.md](PROFESSIONAL_COPY_UPDATES.md) - Copy update details

## Support

For issues, questions, or suggestions:
- Check [DEVELOPMENT.md](DEVELOPMENT.md) for troubleshooting
- Review browser console (F12) for error messages
- Check [COPY_STYLE_GUIDE.md](COPY_STYLE_GUIDE.md) for platform terminology

## License

© 2026 Guide Learning Platform. All rights reserved.

---

**Ready to master your education? [Get Started](http://localhost:3000/)**
