# Solimesh - Production Ready Deployment

## Quick Start (5 minutes)

### 1. Create Supabase Project
- Go to https://supabase.com → Sign up (free)
- Create new project: `solimesh`
- Wait for initialization

### 2. Get Credentials
In Supabase Dashboard → Settings → API:
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Setup Database
Go to SQL Editor in Supabase and run this:

```sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pantry items
CREATE TABLE public.pantry_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  storage_location TEXT,
  storage_tips TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Support contacts
CREATE TABLE public.support_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_name TEXT NOT NULL,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('friend', 'family', 'neighbor', 'other')),
  phone TEXT,
  email TEXT,
  last_contact_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Abundance signals (mutual aid)
CREATE TABLE public.abundance_signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  location JSONB NOT NULL,
  stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
  signal_status TEXT NOT NULL CHECK (signal_status IN ('active', 'claimed', 'expired')),
  claimed_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- User preferences
CREATE TABLE public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  low_stimulation_mode BOOLEAN DEFAULT FALSE,
  font_size TEXT DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large')),
  high_contrast BOOLEAN DEFAULT FALSE,
  reduced_motion BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_pantry_items_user_id ON public.pantry_items(user_id);
CREATE INDEX idx_pantry_items_expiry_date ON public.pantry_items(expiry_date);
CREATE INDEX idx_support_contacts_user_id ON public.support_contacts(user_id);
CREATE INDEX idx_abundance_signals_user_id ON public.abundance_signals(user_id);
CREATE INDEX idx_abundance_signals_status ON public.abundance_signals(signal_status);
CREATE INDEX idx_abundance_signals_created_at ON public.abundance_signals(created_at DESC);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abundance_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies - Pantry Items
CREATE POLICY "Users can view own pantry" ON public.pantry_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pantry" ON public.pantry_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pantry" ON public.pantry_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own pantry" ON public.pantry_items FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies - Support Contacts
CREATE POLICY "Users can view own contacts" ON public.support_contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own contacts" ON public.support_contacts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own contacts" ON public.support_contacts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own contacts" ON public.support_contacts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies - Abundance Signals
CREATE POLICY "Users can view active signals" ON public.abundance_signals FOR SELECT USING (signal_status = 'active');
CREATE POLICY "Users can insert own signals" ON public.abundance_signals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own signals" ON public.abundance_signals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own signals" ON public.abundance_signals FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies - User Preferences
CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email) VALUES (new.id, new.email);
  INSERT INTO public.user_preferences (user_id) VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### 5. Install & Run
```bash
npm install
npm run dev
```

Visit http://localhost:3000

### 6. Deploy to Vercel
```bash
git push origin main
```
Then import repo at https://vercel.com/new and add env vars.

---

## Features Included

✅ **Authentication**: Email/password with Supabase Auth
✅ **Pantry Management**: Track food inventory with expiry dates
✅ **AI Scanner**: Receipt/item scanning with Gemini 2.5 Flash
✅ **Support CRM**: Relationship tracking with contact nudges
✅ **Mutual Aid Mesh**: Real-time abundance signals map
✅ **Neuro-Adaptive UI**: Low-stimulation mode for accessibility
✅ **Offline-First**: Service worker for offline functionality
✅ **Row-Level Security**: User data isolation at database level
✅ **Real-time Updates**: Supabase Realtime for live signals
✅ **Cyberpunk Design**: Professional dark theme with neon accents

---

## Production Checklist

- [ ] Supabase project created
- [ ] Database schema imported
- [ ] Environment variables configured
- [ ] Local testing complete
- [ ] Vercel deployment configured
- [ ] Custom domain setup (optional)
- [ ] Email verification enabled
- [ ] Backup strategy in place

---

**Ready for production!** 🚀
