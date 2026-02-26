# 🌐 Solimesh - Cyberpunk Theme Guide

## Design Philosophy

Solimesh features a professional cyberpunk aesthetic with smooth gradients, neon glows, and modern UI patterns. The design prioritizes both visual appeal and accessibility.

---

## Color Palette

### Primary Colors
- **Cyber Dark**: `#0a0e27` - Main background
- **Cyber Darker**: `#050812` - Darker background
- **Cyber Surface**: `#1a1f3a` - Card backgrounds
- **Cyber Surface 2**: `#252d48` - Secondary surfaces

### Accent Colors
- **Cyan**: `#00d9ff` - Primary accent
- **Pink**: `#ff006e` - Secondary accent
- **Purple**: `#8338ec` - Tertiary accent
- **Yellow**: `#ffbe0b` - Highlight accent

### Text Colors
- **Text**: `#e0e0ff` - Primary text
- **Text 2**: `#a0a0c0` - Secondary text

---

## Components

### Cards
```html
<!-- Cyan glow card -->
<div class="card-cyber p-6">Content</div>

<!-- Pink glow card -->
<div class="card-cyber-pink p-6">Content</div>

<!-- Purple glow card -->
<div class="card-cyber-purple p-6">Content</div>
```

### Buttons
```html
<!-- Primary button -->
<button class="btn-cyber">Click me</button>

<!-- Secondary button -->
<button class="btn-cyber-secondary">Click me</button>

<!-- Outline button -->
<button class="btn-cyber-outline">Click me</button>

<!-- Outline pink button -->
<button class="btn-cyber-outline-pink">Click me</button>
```

### Inputs
```html
<!-- Text input -->
<input type="text" class="input-cyber" />

<!-- Select -->
<select class="select-cyber">
  <option>Option 1</option>
</select>

<!-- Textarea -->
<textarea class="textarea-cyber"></textarea>
```

### Badges
```html
<!-- Cyan badge -->
<span class="badge-cyber">Badge</span>

<!-- Pink badge -->
<span class="badge-cyber-pink">Badge</span>

<!-- Purple badge -->
<span class="badge-cyber-purple">Badge</span>
```

---

## Gradients

### Background Gradients
- `bg-gradient-cyber` - Dark to surface gradient
- `bg-gradient-accent` - Cyan to purple gradient
- `bg-gradient-accent2` - Pink to yellow gradient
- `bg-gradient-accent3` - Purple to cyan gradient
- `bg-gradient-neon` - Multi-color neon gradient

### Text Gradients
- `text-gradient-cyan` - Cyan to purple text
- `text-gradient-pink` - Pink to yellow text
- `text-gradient-neon` - Multi-color neon text

---

## Glow Effects

### Shadow Glows
- `shadow-glow-cyan` - Cyan glow effect
- `shadow-glow-pink` - Pink glow effect
- `shadow-glow-purple` - Purple glow effect
- `shadow-glow-cyan-lg` - Large cyan glow
- `shadow-glow-pink-lg` - Large pink glow

### CSS Classes
- `.glow-cyan` - Cyan glow with inset
- `.glow-pink` - Pink glow with inset
- `.glow-purple` - Purple glow with inset
- `.glow-cyan-lg` - Large cyan glow
- `.glow-pink-lg` - Large pink glow

---

## Animations

### Built-in Animations
- `animate-pulse-glow` - Pulsing glow effect
- `animate-float` - Floating animation
- `animate-glow-flicker` - Flickering glow

### Usage
```html
<div class="animate-pulse-glow">Glowing element</div>
<div class="animate-float">Floating element</div>
<div class="animate-glow-flicker">Flickering element</div>
```

---

## Navigation

### Navigation Bar
```html
<nav class="nav-cyber">
  <a href="#" class="nav-link">Link</a>
</nav>
```

The nav-link has an animated underline on hover.

---

## Utilities

### Divider
```html
<div class="divider-cyber"></div>
```

### Smooth Transitions
```html
<div class="transition-smooth">Content</div>
```

### Loading Spinner
```html
<div class="loading-spinner"></div>
```

---

## Accessibility Features

### Low Stimulation Mode
Disables all glows and animations:
```html
<div class="low-stimulation">Content</div>
```

### High Contrast Mode
Black background with white text:
```html
<div class="high-contrast">Content</div>
```

### Font Size Utilities
- `.text-small` - Small text
- `.text-large` - Large text

---

## Responsive Design

All components are mobile-first and responsive:
- Mobile: Full width
- Tablet (md): 2-column layouts
- Desktop (lg): 3-4 column layouts

---

## Custom CSS Classes

### Card Styles
```css
.card-cyber { /* Cyan glow card */ }
.card-cyber-pink { /* Pink glow card */ }
.card-cyber-purple { /* Purple glow card */ }
```

### Button Styles
```css
.btn-cyber { /* Primary button */ }
.btn-cyber-secondary { /* Secondary button */ }
.btn-cyber-outline { /* Outline button */ }
.btn-cyber-outline-pink { /* Pink outline */ }
```

### Input Styles
```css
.input-cyber { /* Text input */ }
.select-cyber { /* Select dropdown */ }
.textarea-cyber { /* Textarea */ }
```

### Badge Styles
```css
.badge-cyber { /* Cyan badge */ }
.badge-cyber-pink { /* Pink badge */ }
.badge-cyber-purple { /* Purple badge */ }
```

---

## Scrollbar Styling

Custom scrollbar with gradient:
- Track: Dark surface color
- Thumb: Gradient from cyan to purple
- Hover: Glowing effect

---

## Best Practices

1. **Use semantic colors**: Use cyan for primary, pink for secondary, purple for tertiary
2. **Maintain contrast**: Ensure text is readable on backgrounds
3. **Animate purposefully**: Use animations to guide user attention
4. **Respect accessibility**: Provide low-stimulation alternatives
5. **Consistent spacing**: Use Tailwind's spacing scale
6. **Smooth transitions**: Use `transition-smooth` for interactions

---

## Examples

### Hero Section
```html
<div class="min-h-screen bg-gradient-cyber">
  <h1 class="text-6xl font-bold text-gradient-neon">Title</h1>
  <p class="text-cyber-text2">Subtitle</p>
  <button class="btn-cyber">Action</button>
</div>
```

### Card Grid
```html
<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div class="card-cyber p-6">Card 1</div>
  <div class="card-cyber-pink p-6">Card 2</div>
  <div class="card-cyber-purple p-6">Card 3</div>
  <div class="card-cyber p-6">Card 4</div>
</div>
```

### Form
```html
<form class="space-y-5">
  <div>
    <label class="block text-sm font-semibold text-cyber-text mb-2">
      Label
    </label>
    <input type="text" class="input-cyber" />
  </div>
  <button type="submit" class="btn-cyber w-full">Submit</button>
</form>
```

---

## Customization

To customize colors, edit `tailwind.config.js`:

```javascript
colors: {
  cyber: {
    dark: '#0a0e27',
    accent: '#00d9ff',
    // ... more colors
  },
}
```

---

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

---

## Performance

- Optimized CSS with Tailwind
- Smooth 60fps animations
- GPU-accelerated transforms
- Minimal bundle size

---

## Accessibility

- WCAG 2.1 AA compliant
- High contrast mode support
- Reduced motion support
- Keyboard navigation
- Screen reader friendly

---

## Resources

- Tailwind CSS: https://tailwindcss.com
- Color theory: https://www.color-hex.com
- Accessibility: https://www.w3.org/WAI/

---

**Theme Version**: 1.0.0
**Last Updated**: 2024
**License**: MIT
