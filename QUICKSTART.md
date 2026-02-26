# Solimesh - Quick Start

## 🚀 Get Started in 5 Minutes

### 1. Clone & Install
```bash
cd Solimesh
npm install
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

### 3. Set Up Supabase
- Create a free account at https://supabase.com
- Create a new project
- Run the SQL migrations from SETUP.md
- Copy your project URL and anon key to .env.local

### 4. Get API Keys
- **Gemini API**: https://aistudio.google.com/app/apikey
- **Mapbox** (optional): https://account.mapbox.com/tokens/

### 5. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 and start building!

## 📱 Features Ready to Use

### Module A: Scanner ✅
- Upload receipt/grocery photos
- AI extracts items automatically
- Predicts shelf life

### Module B: Neuro-Adaptive UI ✅
- Low-stimulation mode toggle
- High contrast option
- Font size adjustment
- Reduced motion support

### Module C: Support CRM ✅
- Track support contacts
- Monitor relationship health
- Get nudges for lost connections

### Module D: Mutual Aid Mesh ✅
- Create abundance signals
- Real-time signal broadcasting
- Stress level tracking

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **AI**: Gemini 2.5 Flash, DeepSeek R1
- **State**: Zustand, TanStack Query
- **Hosting**: Vercel

## 📚 Project Structure

```
app/              # Pages and routes
├── auth/         # Login/signup
├── scanner/      # AI scanner
├── pantry/       # Inventory
├── contacts/     # CRM
├── mesh/         # Mutual aid
└── settings/     # Accessibility

lib/              # API clients & utilities
hooks/            # Custom React hooks
store/            # State management
types/            # TypeScript definitions
components/       # Reusable UI components
```

## 🔐 Security

- Row-Level Security (RLS) enforced at database level
- Users can only access their own data
- All code is open source for community review
- No credentials stored in frontend

## 📖 Next Steps

1. **Test Authentication**: Sign up and log in
2. **Try Scanner**: Upload a receipt image
3. **Add Items**: Build your pantry inventory
4. **Add Contacts**: Track your support network
5. **Create Signals**: Share surplus food with community

## 🐛 Troubleshooting

**"Cannot find module '@supabase/supabase-js'"**
```bash
npm install
```

**"API key not found"**
- Check .env.local exists and has correct keys
- Restart dev server after updating .env.local

**"Database connection failed"**
- Verify Supabase URL and anon key
- Check RLS policies are enabled
- Ensure tables are created

## 💡 Tips

- Use low-stimulation mode for accessibility testing
- Test offline functionality in DevTools
- Check browser console for detailed error messages
- Use Supabase dashboard to monitor database

## 📞 Support

- Check SETUP.md for detailed configuration
- Review code comments for implementation details
- Check Supabase docs: https://supabase.com/docs
- Check Next.js docs: https://nextjs.org/docs

Happy building! 🌱
