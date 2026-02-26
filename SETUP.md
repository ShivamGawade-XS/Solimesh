# Solimesh - Setup Guide

## Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier)
- Google AI Studio account (for Gemini API)
- Mapbox account (optional, for mapping)

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `GEMINI_API_KEY`: Your Google AI Studio API key
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox token (optional)

### 3. Set Up Supabase Database

Create the following tables in your Supabase project:

#### pantry_items
```sql
CREATE TABLE pantry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity INT NOT NULL,
  unit TEXT NOT NULL,
  expiry_date TIMESTAMP NOT NULL,
  storage_location TEXT,
  storage_tips TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pantry_user_id ON pantry_items(user_id);
```

#### support_contacts
```sql
CREATE TABLE support_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_name TEXT NOT NULL,
  contact_type TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  last_contact_date TIMESTAMP NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contacts_user_id ON support_contacts(user_id);
```

#### abundance_signals
```sql
CREATE TABLE abundance_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES pantry_items(id) ON DELETE SET NULL,
  location JSONB,
  stress_level INT,
  signal_status TEXT NOT NULL,
  claimed_by_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_signals_user_id ON abundance_signals(user_id);
CREATE INDEX idx_signals_status ON abundance_signals(signal_status);
```

#### user_preferences
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  low_stimulation_mode BOOLEAN DEFAULT FALSE,
  font_size TEXT DEFAULT 'medium',
  high_contrast BOOLEAN DEFAULT FALSE,
  reduced_motion BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Enable Row-Level Security (RLS)

For each table, enable RLS and add policies:

```sql
-- Enable RLS
ALTER TABLE pantry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE abundance_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Pantry items policies
CREATE POLICY "Users can view own pantry items"
  ON pantry_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pantry items"
  ON pantry_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pantry items"
  ON pantry_items FOR DELETE
  USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Solimesh/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── scanner/           # AI scanner module
│   ├── pantry/            # Pantry list module
│   ├── contacts/          # Support CRM module
│   ├── mesh/              # Mutual aid mesh module
│   └── settings/          # Accessibility settings
├── components/            # Reusable React components
├── lib/                   # Utility functions and API clients
├── hooks/                 # Custom React hooks
├── store/                 # Zustand state management
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Features Implemented

- ✅ User authentication (Supabase Auth)
- ✅ AI-powered food item scanner (Gemini 2.5 Flash)
- ✅ Pantry inventory management
- ✅ Support contact tracking
- ✅ Neuro-adaptive UI (accessibility settings)
- ✅ Real-time mutual aid signals
- ⏳ Offline support (PWA - in progress)
- ⏳ Geolocation-based mesh (in progress)

## API Rate Limits

- Gemini 2.5 Flash: 15 requests per minute
- Supabase: 500MB storage, 50k monthly active users (free tier)

## Contributing

Follow the execution guidelines:
1. Validate neighborhood demand before large features
2. Build modularly
3. Respect free-tier constraints

## License

MIT
