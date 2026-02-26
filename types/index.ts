export interface PantryItem {
  id: string;
  user_id: string;
  item_name: string;
  quantity: number;
  unit: string;
  expiry_date: string;
  storage_location: string;
  storage_tips: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface SupportContact {
  id: string;
  user_id: string;
  contact_name: string;
  contact_type: 'friend' | 'family' | 'neighbor' | 'other';
  phone: string;
  email: string;
  last_contact_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AbundanceSignal {
  id: string;
  user_id: string;
  item_id: string;
  location: { lat: number; lng: number };
  stress_level: number;
  signal_status: 'active' | 'claimed' | 'expired';
  claimed_by_user_id: string | null;
  created_at: string;
  expires_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  low_stimulation_mode: boolean;
  font_size: 'small' | 'medium' | 'large';
  high_contrast: boolean;
  reduced_motion: boolean;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}
