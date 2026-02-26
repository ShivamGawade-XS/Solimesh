# 🧪 Solimesh - Demo Mode Guide

## Running Without Supabase

Your Solimesh app now includes a **demo mode** that allows you to test the UI and features without configuring Supabase.

---

## 🚀 Quick Start (Demo Mode)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

### 4. Test the App
- Click "Get Started" or "Sign In"
- Use any email and password (6+ characters)
- You'll be logged in with a demo account
- Explore all pages and features

---

## 📝 Demo Mode Features

### What Works in Demo Mode
✅ All pages load and display
✅ Navigation works
✅ Forms submit without errors
✅ UI/UX is fully functional
✅ Animations and effects work
✅ Responsive design works
✅ Accessibility features work

### What Requires Supabase
❌ Data persistence (data won't be saved)
❌ Real authentication
❌ Database operations
❌ Real-time updates
❌ File uploads

---

## 🔧 Configure Supabase (Optional)

To enable full functionality with data persistence:

### 1. Create Supabase Project
- Go to https://supabase.com
- Create a new project
- Get your project URL and anon key

### 2. Create Environment File
```bash
cp .env.local.example .env.local
```

### 3. Add Credentials
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### 4. Create Database Tables
Follow the SQL migrations in `SETUP.md`

### 5. Restart Dev Server
```bash
npm run dev
```

---

## 🎯 Testing Checklist (Demo Mode)

### Pages
- [ ] Home page loads
- [ ] Login page displays
- [ ] Signup page displays
- [ ] Scanner page loads
- [ ] Pantry page loads
- [ ] Contacts page loads
- [ ] Mesh page loads
- [ ] Settings page loads

### Navigation
- [ ] Navigation links work
- [ ] Can navigate between pages
- [ ] Back button works
- [ ] Links are clickable

### Forms
- [ ] Login form submits
- [ ] Signup form submits
- [ ] Contact form submits
- [ ] Settings form works

### UI/UX
- [ ] Cyberpunk theme displays
- [ ] Gradients render correctly
- [ ] Glow effects show
- [ ] Animations play
- [ ] Buttons are clickable
- [ ] Inputs are focusable

### Accessibility
- [ ] Low-stimulation mode toggles
- [ ] High-contrast mode toggles
- [ ] Font size changes
- [ ] Reduced motion works

### Responsive
- [ ] Mobile view works (< 768px)
- [ ] Tablet view works (768px - 1024px)
- [ ] Desktop view works (> 1024px)

---

## 🐛 Troubleshooting

### "Failed to fetch" Error
**Cause**: Supabase not configured
**Solution**: This is normal in demo mode. The app will use mock data.

### Page Not Loading
**Cause**: Build issue
**Solution**: 
```bash
rm -rf .next
npm run dev
```

### Styles Not Showing
**Cause**: CSS not compiled
**Solution**:
```bash
npm run dev
# Wait for "ready - started server on 0.0.0.0:3000"
```

### Port Already in Use
**Cause**: Another process using port 3000
**Solution**:
```bash
npm run dev -- -p 3001
# Opens on http://localhost:3001
```

---

## 📊 Demo Mode Behavior

### Authentication
- Any email/password combination works
- User is logged in immediately
- Session persists during dev session
- Logout clears session

### Data
- No data is saved to database
- Forms submit but don't persist
- Page refresh clears data
- Each session starts fresh

### Features
- All UI features work
- All pages are accessible
- All animations play
- All effects display

---

## 🎨 Testing the Cyberpunk Theme

### Color Palette
- Cyan accents (#00d9ff)
- Pink accents (#ff006e)
- Purple accents (#8338ec)
- Dark background (#0a0e27)

### Effects
- Glow effects on cards
- Gradient backgrounds
- Smooth animations
- Hover effects

### Components
- Gradient buttons
- Glowing cards
- Smooth inputs
- Animated navigation

---

## 🔄 Switching to Production

### When Ready to Deploy

1. **Configure Supabase**
   - Create project
   - Set up database
   - Add credentials to `.env.local`

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Test Production Build**
   ```bash
   npm start
   ```

4. **Deploy to Vercel**
   ```bash
   git push origin main
   ```

---

## 📚 Documentation

- `QUICKSTART.md` - Quick start guide
- `SETUP.md` - Supabase setup
- `DEVELOPMENT.md` - Development guide
- `CYBERPUNK_THEME.md` - Theme guide

---

## 💡 Tips

1. **Test on Mobile**: Use browser DevTools to test responsive design
2. **Test Accessibility**: Toggle low-stimulation and high-contrast modes
3. **Test Navigation**: Click all links and buttons
4. **Test Forms**: Submit all forms to verify they work
5. **Test Animations**: Watch for smooth transitions and effects

---

## 🎯 Next Steps

### For Demo Testing
1. Run `npm run dev`
2. Test all pages and features
3. Verify UI/UX
4. Check responsive design
5. Test accessibility

### For Production
1. Configure Supabase
2. Create database tables
3. Set environment variables
4. Build and test
5. Deploy to Vercel

---

## 📞 Support

- Check `SETUP.md` for Supabase configuration
- Check `DEVELOPMENT.md` for development tips
- Check `CYBERPUNK_THEME.md` for design details
- Review code comments for implementation details

---

**Demo Mode**: ✅ Enabled
**Status**: Ready to test
**Version**: 1.0.0 (MVP)

Enjoy exploring Solimesh! 🚀
