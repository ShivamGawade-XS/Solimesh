# Solimesh - Production Ready 🚀

**A market-ready Progressive Web App for community resilience combining AI-driven inventory management with real-time mutual aid signaling.**

## ✨ What's Included

### Core Features
- **🔐 Authentication**: Email/password with Supabase Auth
- **📸 AI Scanner**: Receipt/item scanning with Gemini 2.5 Flash
- **🥫 Pantry Management**: Track food inventory with expiry dates
- **🤝 Support CRM**: Relationship tracking with contact nudges
- **🗺️ Mutual Aid Mesh**: Real-time abundance signals map
- **♿ Neuro-Adaptive UI**: Low-stimulation mode for accessibility
- **📱 Offline-First**: Service worker for offline functionality
- **🔒 Row-Level Security**: User data isolation at database level
- **⚡ Real-time Updates**: Supabase Realtime for live signals
- **🎨 Cyberpunk Design**: Professional dark theme with neon accents

### Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **State**: Zustand + TanStack Query
- **AI**: Gemini 2.5 Flash, DeepSeek R1
- **Hosting**: Vercel (recommended)

---

## 🚀 Quick Start (5 Minutes)

### 1. Create Supabase Project
```bash
# Go to https://supabase.com
# Sign up → Create new project → Wait for initialization
```

### 2. Get Credentials
In Supabase Dashboard → Settings → API:
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Setup Database
Go to SQL Editor in Supabase and run the SQL from `DEPLOY.md` (copy entire SQL block)

### 4. Configure Environment
```bash
cp .env.local.production .env.local
# Edit .env.local with your Supabase credentials
```

### 5. Install & Run
```bash
npm install
npm run dev
```

Visit http://localhost:3000

---

## 📋 Production Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `GEMINI_API_KEY` (optional)
     - `NEXT_PUBLIC_MAPBOX_TOKEN` (optional)

3. **Deploy**
   - Click Deploy
   - Your app is live!

### Custom Domain
In Vercel Dashboard → Settings → Domains → Add custom domain

---

## 🔧 Configuration

### Required Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional Environment Variables
```env
GEMINI_API_KEY=your-gemini-api-key-here
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here
DEEPSEEK_API_KEY=your-deepseek-key-here
HUGGINGFACE_API_KEY=your-huggingface-key-here
```

### Get API Keys
- **Gemini**: https://aistudio.google.com/app/apikey
- **Mapbox**: https://account.mapbox.com/tokens/
- **DeepSeek**: https://platform.deepseek.com/
- **Hugging Face**: https://huggingface.co/settings/tokens

---

## 📊 Database Schema

### Tables
- `users` - User profiles
- `pantry_items` - Food inventory
- `support_contacts` - Relationship tracking
- `abundance_signals` - Mutual aid signals
- `user_preferences` - UI preferences

### Security
- Row-Level Security (RLS) enforced at database level
- Users can only access their own data
- Public read access for active abundance signals

---

## 🎯 Features Breakdown

### Scanner Module
- Upload receipt or grocery image
- AI extracts items automatically
- Predicts shelf life using USDA FoodKeeper
- Generates storage tips

### Pantry Management
- Track all food items
- Monitor expiry dates
- Get expiry alerts
- Organize by location

### Support CRM
- Track important relationships
- Log last contact date
- Get nudges if losing touch (>3 days)
- Store contact info and notes

### Mutual Aid Mesh
- Broadcast items you want to share
- Log stress level (1-10)
- Auto-signal if item expiring + stressed
- View nearby abundance signals
- Claim items from community

### Neuro-Adaptive UI
- Toggle low-stimulation mode
- Monochromatic colors
- Increased contrast
- Simplified navigation
- Reduced animations

---

## 🔒 Security & Privacy

### Data Protection
- All user data encrypted in transit (HTTPS)
- Row-Level Security at database level
- No data shared between users
- Offline-first architecture

### Transparency
- Open source code
- Public audit trail
- No tracking or analytics
- GDPR compliant

---

## 📈 Scaling

### Free Tier Limits
- 500MB database storage
- 50k monthly active users
- 2GB file storage
- Unlimited API calls (rate limited)

### Upgrade Path
- Pro: $25/month → 8GB storage, 100k users
- Team: $599/month → 100GB storage, unlimited users

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env.local` has correct values
- Restart dev server: `npm run dev`

### "Row Level Security policy violation"
- Check RLS policies in Supabase Dashboard
- Verify user is authenticated

### "Realtime not working"
- Enable Realtime in Supabase Project Settings
- Check browser console for errors

### "Build fails with TypeScript errors"
- Run `npm run build` to see full errors
- Check file paths and imports

---

## 📚 Documentation

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Zustand**: https://github.com/pmndrs/zustand
- **TanStack Query**: https://tanstack.com/query/latest

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🎉 You're Ready!

Your production-ready Solimesh instance is now live. Start building community resilience! 🌱

### Next Steps
1. ✅ Set up Supabase project
2. ✅ Configure environment variables
3. ✅ Deploy to Vercel
4. ✅ Share with your community
5. ✅ Monitor usage in Supabase Dashboard

---

**Questions?** Check DEPLOY.md for detailed setup instructions.
