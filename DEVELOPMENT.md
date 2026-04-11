# Local Development Guide - Career Compass

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (check with `node -v`)
- npm 9+ (check with `npm -v`)
- Git

### Initial Setup

```bash
# 1. Navigate to project directory
cd "c:\Users\11e12\Downloads\guide-productivity (2)"

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Add your Gemini API Key to .env
# Edit .env and add: GEMINI_API_KEY=your_key_here
```

---

## 📝 Available Commands

### Development
```bash
npm run dev              # Start dev server (localhost:3000)
npm run type-check      # Type check with TypeScript
npm run lint            # Run ESLint
npm run lint:fix        # Auto-fix ESLint issues
npm run format          # Format code with Prettier
npm run format:check    # Check if code follows formatting
```

### Production
```bash
npm run build           # Build for production (dist/)
npm run preview         # Preview production build locally
```

---

## 🔧 Development Workflow

### 1. **Start Development Server**
```bash
npm run dev
```
- Opens on http://localhost:3000/
- Hot Module Reload (HMR) enabled - changes auto-reload
- View console for debugging logs

### 2. **Code Quality**

Before committing code:
```bash
npm run type-check      # Catch TypeScript errors
npm run lint:fix        # Auto-fix linting issues
npm run format          # Format code consistently
```

### 3. **Debugging**

#### Browser DevTools
- Open DevTools: `F12` or `Ctrl+Shift+I`
- React DevTools: Install from Chrome Web Store
- Redux/Zustand DevTools: Already integrated

#### VS Code Debugging
- Launch config ready in `.vscode/launch.json`
- Set breakpoints in editor
- Press `F5` to start debugging

#### Console Logs
The app includes console logging throughout:
```
main.tsx: Starting application mount...
Firebase initialized successfully
Firestore initialized with databaseId: ...
```

---

## 📁 Project Structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Main app component with routing
├── index.css             # Global styles (Tailwind CSS)
├── constants.tsx         # App constants
├── types.ts              # TypeScript type definitions
│
├── pages/                # Route pages
│   ├── Dashboard.tsx     # Main dashboard
│   ├── Tasks.tsx         # Task management
│   ├── Habits.tsx        # Habit tracking
│   ├── Calendar.tsx      # Calendar view
│   ├── Analytics.tsx     # Analytics dashboard
│   └── ...
│
├── components/           # Reusable components
│   ├── layout/           # Layout components
│   │   ├── AppLayout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── ErrorBoundary.tsx # Error handling
│   ├── GlobalSearch.tsx  # Search feature
│   └── ...
│
├── context/              # React Context
│   └── AuthContext.tsx   # Authentication state
│
├── stores/               # Zustand state stores
│   ├── taskStore.ts      # Task management state
│   ├── habitStore.ts     # Habit tracking state
│   └── uiStore.ts        # UI state
│
├── lib/                  # Libraries & utils
│   └── firebase.ts       # Firebase configuration
│
└── utils/                # Helper functions
    └── activity.ts       # Activity utilities
```

---

## 🔐 Authentication

The app uses **Firebase Authentication** with Google Sign-In:

1. Visit http://localhost:3000/
2. Click "Sign in with Google"
3. Complete Google authentication
4. User data synced with Firestore automatically

---

## 🗄️ Database Structure

### Firestore Collections
```
users/
├── {uid}/
│   ├── name
│   ├── email
│   ├── role (student/admin)
│   └── avatar

tasks/
├── {userId}/
│   └── {taskId}
│       ├── title
│       ├── description
│       ├── completed
│       └── dueDate

habits/
├── {userId}/
│   └── {habitId}
│       ├── name
│       ├── frequency
│       └── streak
```

---

## 🎨 Styling

- **Framework**: Tailwind CSS v4
- **Plugin**: @tailwindcss/vite for faster development
- **Colors**: Dark theme with accent #DFFF00 (neon yellow)

### Custom Tailwind Classes
Check `tailwind.config.js` for custom configuration:
```bash
npm run dev     # Tailwind watches for class usage in dev
```

---

## 🧪 Testing & Validation

```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check
```

---

## 📊 Performance Tips

1. **React DevTools Profiler**: Check component render times
2. **Network Tab**: Monitor API calls and data loading
3. **Lighthouse**: Run in Chrome DevTools for audit
4. **Bundle Size**: Check after `npm run build`

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find root element"
- **Cause**: Missing `<div id="root">` in index.html
- **Fix**: Already configured in index.html

### Issue: Firebase auth not initializing
- **Cause**: Missing firebase-applet-config.json
- **Fix**: Check file exists in project root

### Issue: Hot reload not working
- **Cause**: Browser cache
- **Fix**: Hard refresh (Ctrl+Shift+R) or clear cache

### Issue: Port 3000 already in use
- **Fix**: Kill process: `npx kill-port 3000`
- Or change port in `vite.config.ts`

---

## 🚢 Deployment

### Build for Production
```bash
npm run build        # Creates dist/ folder
npm run preview      # Test production build locally
```

### Deployment Options
- **Vercel**: Auto-deploy from GitHub
- **Firebase Hosting**: `firebase deploy`
- **Netlify**: Connect GitHub repo
- **Docker**: Create Dockerfile for containerization

---

## 📚 Useful Resources

- [Vite Documentation](https://vitejs.dev/)
- [React 19 Docs](https://react.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👥 Team Development

### Git Workflow
```bash
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: describe your changes"
git push origin feature/your-feature
# Create Pull Request
```

### Code Review Checklist
- ✅ TypeScript types correct
- ✅ No console errors/warnings
- ✅ Code formatted with Prettier
- ✅ ESLint rules pass
- ✅ Tests pass (if applicable)

---

## 📞 Need Help?

Check console logs for error messages:
- Press `F12` to open DevTools
- Look in Console tab for errors
- Check Network tab for failed API calls

Happy coding! 🎉
