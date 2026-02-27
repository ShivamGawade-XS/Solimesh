# Solimesh - Production Deployment Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available at https://supabase.com)
- Vercel account (for hosting)

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up
2. Create a new project:
   - Project name: `solimesh`
   - Database password: Create a strong password
   - Region: Choose closest to your users
3. Wait for project initialization (2-3 minutes)

## Step 2: Get Supabase Credentials

1. Go to Project Settings → API
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Set Up Database Schema

1. In Supabase, go to SQL Editor
2. Create a new query and run this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pantry items table
CREATE TABLE IF NOT EXISTS public.pantry_items (
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

-- Support contacts table
CREATE TABLE IF NOT EXISTS public.support_contacts (
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

-- Abundance signals table (mutual aid mesh)
CREATE TABLE IF NOT EXISTS public.abundance_signals (
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

-- User preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  low_stimulation_mode BOOLEAN DEFAULT FALSE,
  font_size TEXT DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large')),
  high_contrast BOOLEAN DEFAULT FALSE,
  reduced_motion BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_pantry_items_user_id ON public.pantry_items(user_id);
CREATE INDEX idx_pantry_items_expiry_date ON public.pantry_items(expiry_date);
CREATE INDEX idx_support_contacts_user_id ON public.support_contacts(user_id);
CREATE INDEX idx_abundance_signals_user_id ON public.abundance_signals(user_id);
CREATE INDEX idx_abundance_signals_status ON public.abundance_signals(signal_status);
CREATE INDEX idx_abundance_signals_created_at ON public.abundance_signals(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abundance_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for pantry_items
CREATE POLICY "Users can view their own pantry items"
  ON public.pantry_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pantry items"
  ON public.pantry_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pantry items"
  ON public.pantry_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pantry items"
  ON public.pantry_items FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for support_contacts
CREATE POLICY "Users can view their own contacts"
  ON public.support_contacts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts"
  ON public.support_contacts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
  ON public.support_contacts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
  ON public.support_contacts FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for abundance_signals
CREATE POLICY "Users can view all active signals"
  ON public.abundance_signals FOR SELECT
  USING (signal_status = 'active');

CREATE POLICY "Users can insert their own signals"
  ON public.abundance_signals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own signals"
  ON public.abundance_signals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own signals"
  ON public.abundance_signals FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  
  INSERT INTO public.user_preferences (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 4: Configure Environment Variables

1. Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

2. Get API keys:
   - **Gemini API**: https://aistudio.google.com/app/apikey
   - **Mapbox Token**: https://account.mapbox.com/tokens/

## Step 5: Install Dependencies & Run Locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Step 6: Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy

## Step 7: Enable Authentication Methods

In Supabase Dashboard → Authentication → Providers:

1. **Email/Password** (enabled by default)
2. **Google OAuth** (optional):
   - Create OAuth app at https://console.cloud.google.com
   - Add credentials to Supabase
3. **GitHub OAuth** (optional):
   - Create OAuth app at https://github.com/settings/developers
   - Add credentials to Supabase

## Features Included

✅ **Scanner Module**: AI-powered receipt/item scanning with Gemini 2.5 Flash
✅ **Pantry Management**: Track food inventory with expiry dates
✅ **Support CRM**: Relationship tracking with contact nudges
✅ **Mutual Aid Mesh**: Real-time abundance signals map
✅ **Neuro-Adaptive UI**: Low-stimulation mode for accessibility
✅ **Offline-First**: Service worker for offline functionality
✅ **Row-Level Security**: User data isolation at database level
✅ **Real-time Updates**: Supabase Realtime for live signals

## Monitoring & Maintenance

### Database Backups
- Supabase automatically backs up daily
- Manual backups available in Project Settings

### Performance Monitoring
- Check Supabase Dashboard → Database → Logs
- Monitor API usage in Project Settings → Usage

### Scaling
- Free tier: 500MB storage, 50k monthly active users
- Upgrade to Pro for higher limits

## Support & Documentation

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Solimesh GitHub: https://github.com/ShivamGawade-XS/Solimesh

## Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env.local` has correct values
- Restart dev server after updating env vars

### "Row Level Security policy violation"
- Check RLS policies in Supabase Dashboard
- Verify user is authenticated

### "Realtime not working"
- Enable Realtime in Supabase Project Settings
- Check browser console for errors

---

**Ready to go live!** 🚀
