# Portfolio AI Coding Agent Instructions

## Architecture Overview
This is a modern React 19 portfolio application with a **data-driven, component-based architecture**:
- **Single data source**: `public/resumeData.json` drives all content (personal info, work history, projects, skills)
- **Component hierarchy**: `App.js` → `Header`, `About`, `Resume`, `Portfolio`, `Footer` (Contact removed)
- **Styling approach**: Monolithic `App.css` with CSS custom properties (2000+ lines) using dark theme design system
- **Animation stack**: Framer Motion for components + React Spring for parallax effects

## Critical Development Patterns

### Data Flow & State Management
```javascript
// App.js fetches data with aggressive cache-busting
const response = await fetch(`/resumeData.json?v=${timestamp}`, {
  cache: 'no-store',
  headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
});
```
- **Props drilling**: `resumeData` object passed down to all components
- **No state management library**: Simple useState for loading states and UI interactions
- **Cache-busting required**: JSON changes need timestamp parameter to bypass browser cache

### CSS Architecture Conventions
```css
/* Dark theme variables drive everything */
:root {
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
  --spacing-wide: 20vw; /* Used for section margins */
  --glass-bg: rgba(255, 255, 255, 0.1);
}
```
- **CSS custom properties**: Extensive use of CSS variables for theming
- **Responsive spacing**: `--spacing-wide: 20vw` for desktop, scales down to `5vw` (tablet) and `3vw` (mobile)
- **Glass morphism**: `backdrop-filter: blur(10px)` + transparent backgrounds
- **Component naming**: `.component-section` → `.component-grid` → `.component-item` hierarchy

### Component Patterns
```javascript
// Standard component structure
const ComponentName = ({ data }) => {
  if (!data) return null; // Always check data existence
  
  const { property1, property2 = [] } = data; // Destructure with defaults
  
  return (
    <section id="component" className="component-section">
      <motion.div // Framer Motion for animations
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
```

## Build & Development Workflow

### Commands
```bash
pnpm start    # Development server with webpack customizations
pnpm build    # Production build
pnpm test     # Test runner
```

### Key Files
- **`config-overrides.js`**: Webpack customizations to suppress Node.js warnings
- **`firebase.json`**: Deployment configuration for Firebase Hosting
- **`public/resumeData.json`**: Content source - edit this for all portfolio updates

### Development Troubleshooting
- **Cached JSON**: Use Ctrl+R keyboard shortcut (dev mode) or hard refresh browser
- **Font Awesome icons**: Both CDN and local fallback loaded in `public/index.html`
- **Modal transparency**: Use `var(--bg-secondary)` instead of `var(--card-bg)` for solid backgrounds

## Data Structure Patterns

### resumeData.json Schema
```json
{
  "main": { /* Personal info, social links, bio */ },
  "resume": { 
    "work": [{ "company", "title", "years", "description" }],
    "skills": [{ "name", "level" }],
    "education": [{ "school", "degree", "graduated", "description" }]
  },
  "portfolio": {
    "projects": [{ "title", "description", "image", "source", "deploy" }]
  }
}
```

### Animation Patterns
- **Framer Motion**: `whileInView` with `viewport={{ once: true }}` for scroll animations
- **Stagger animations**: Use `delay: index * 0.1` for list items
- **Parallax**: `ParallaxBackground` component with floating elements

## Integration Points

### External Dependencies
- **Font Awesome**: Icons loaded via CDN + local fallback
- **Firebase Hosting**: SPA deployment with rewrites
- **React GA4**: Analytics integration (production only)

### Cross-Component Communication
- **Scroll navigation**: `scrollToSection()` function in Header navigates to section IDs
- **Modal system**: Portfolio cards trigger modals with project details
- **Responsive design**: Mobile menu toggle in Header, responsive grids throughout

## Project-Specific Conventions

### File Organization
- **Components**: All in `src/Components/` directory
- **Styling**: Single monolithic `App.css` (avoid component-specific CSS)
- **Assets**: Images in `public/images/`, resume data in `public/resumeData.json`

### Naming Patterns
- **CSS classes**: `kebab-case` (e.g., `hero-section`, `skill-item`)
- **Component props**: `data` object destructured in each component
- **Animation variants**: `initial`, `whileInView`, `viewport` pattern

### Performance Considerations
- **Image optimization**: All images should be optimized for web
- **Animation performance**: Use `transform` properties, avoid layout-triggering animations
- **Bundle size**: Framer Motion and React Spring are heavy - use selective imports when possible
