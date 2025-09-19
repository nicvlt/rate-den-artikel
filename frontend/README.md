# Frontend - Rate den Artikel UI ⚛️

Modern React frontend for the German article guessing game. Built with Vite, Tailwind CSS, and featuring a clean, responsive design optimized for language learning.

## 🎨 Tech Stack

- **React 19**: Latest React with modern hooks and features
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework with custom design system
- **Lucide React**: Beautiful, customizable icons
- **ESLint**: Code linting for code quality
- **Prettier**: Code formatting

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Application entry point
│   ├── index.css                  # Global styles and Tailwind imports
│   ├── components/                # Feature components
│   │   ├── header/
│   │   │   └── Header.jsx         # App title and description
│   │   └── guessing/
│   │       └── Guessing.jsx       # Main game logic component
│   └── ui/                        # Reusable UI components
│       ├── Button/
│       │   └── Button.jsx         # Article selection buttons
│       └── IconButton/
│           └── IconButton.jsx     # Next word button
├── public/
│   └── logo.svg                   # App logo
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
└── vite.config.js                 # Vite configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

### Using Make (from project root)
```bash
make install-frontend  # Install dependencies
make frontend          # Start development server
make dev              # Start both frontend and backend
```

## 🎮 Component Overview

### App.jsx
Main application component that orchestrates the layout:
- Renders Header and Guessing components
- Sets up the centered layout with proper spacing
- Manages overall app structure

### Header.jsx
Displays the application title and instructions:
- German title: "Rate Den Artikel"
- Subtitle with game instructions in German
- Responsive typography using custom fonts

### Guessing.jsx
Core game component handling all game logic:
- **State Management**: Word data, button states, loading states
- **API Integration**: Fetches random words and validates answers
- **User Interaction**: Handles article selection and feedback
- **Visual Feedback**: Color-coded success/failure states
- **Word Definitions**: Click-to-view dictionary integration

### UI Components

**Button.jsx**
Flexible button component for article selection:
- **Props**: `label`, `onClick`, `status`, `disabled`
- **States**: default, success (green), fail (red)
- **Features**: Hover effects, active states, disabled state

**IconButton.jsx**
Specialized button for the "next word" action:
- Uses Lucide React icons
- Conditional visibility based on game state
- Smooth opacity transitions

## 🎨 Design System

### Color Palette
```javascript
colors: {
  dark: '#27292B',      // Primary text
  light: '#fffef3',     // Background/light text
  muted: '#605e4f',     // Secondary text
  accent: '#4e705a',    // Primary accent
  success: '#0FD27A',   // Correct answers
  fail: '#D20F12',      // Wrong answers
}
```

### Typography
- **Headers**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)

### Layout
- **Centered Design**: 550px max width container
- **Interactive Elements**: Hover states, click animations
- **Accessibility**: Proper contrast ratios, keyboard navigation

## 🔧 Configuration

### Environment Variables
```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:8000
```

### Tailwind Configuration
Custom design system with:
- Extended color palette
- Custom font families
- Utility extensions

### Vite Configuration
- React plugin for JSX support
- Tailwind CSS integration
- Hot module replacement
- Development server proxy (if needed)

## 🎯 Features

### Game Mechanics
- **Random Word Display**: Fetches words from backend API
- **Article Selection**: Three buttons for der/die/das
- **Instant Feedback**: Visual success/error indicators
- **Progressive Gameplay**: Next word button after completion
- **Dictionary Integration**: Click words for definitions

### User Experience
- **Loading States**: Disabled buttons during API calls
- **Visual Feedback**: Color-coded button states
- **Smooth Animations**: Transitions and hover effects
- **Responsive Design**: Works on various screen sizes

### Technical Features
- **State Management**: React hooks (useState, useEffect)
- **API Integration**: Fetch API with error handling
- **Component Architecture**: Modular, reusable components

## 🧪 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Code Quality
- **ESLint**: Configured for React best practices
- **Prettier**: Consistent code formatting
- **Type Safety**: PropTypes or TypeScript (future enhancement)

### Development Tools
- **Vite Dev Server**: Hot reload, fast builds
- **React DevTools**: Component debugging
- **Browser DevTools**: Network, performance monitoring

## 🚀 Production Build

### Build Process
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory:
- Minified JavaScript and CSS
- Optimized assets
- Tree-shaken dependencies
- Source maps for debugging

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, CloudFlare
- **Self-hosted**: Nginx, Apache

### Performance Optimizations
- **Code Splitting**: Dynamic imports (future enhancement)
- **Asset Optimization**: Vite's built-in optimizations
- **Bundle Analysis**: `npm run build --analyze`

## 🤝 Contributing

### Development Guidelines
1. Follow React best practices
2. Use functional components with hooks
3. Implement proper error boundaries
4. Write accessible components
5. Test on multiple screen sizes

### Adding New Features
1. Create components in appropriate directories
2. Follow existing naming conventions
3. Update this README if needed
4. Test thoroughly before submitting

## 🐛 Troubleshooting

### Common Issues

**Development server won't start:**
- Check Node.js version (18+)
- Clear `node_modules` and reinstall
- Check for port conflicts

**API calls failing:**
- Verify backend is running
- Check `VITE_BACKEND_URL` environment variable
- Inspect network tab in browser dev tools

**Styling issues:**
- Verify Tailwind configuration
- Check for CSS conflicts
- Clear browser cache

## 🔮 Future Enhancements

- **Learning Algorithms**: Adaptive difficulty based on performance
- **Authentication**: User accounts and progress saving
- **Score Tracking**: User progress and statistics

---

**Built with ⚛️ React and 🎨 Tailwind CSS**