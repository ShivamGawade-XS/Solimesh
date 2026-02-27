'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (typeof window === 'undefined') {
    throw new Error('Supabase client can only be used in browser');
  }

  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase environment variables. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }

    supabaseClient = createClient(url, key);
  }

  return supabaseClient;
}

export const supabase = {
  auth: {
    signUp: async (credentials: { email: string; password: string }) => {
      return getSupabase().auth.signUp(credentials);
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      return getSupabase().auth.signInWithPassword(credentials);
    },
    signOut: async () => {
      return getSupabase().auth.signOut();
    },
    getSession: async () => {
      return getSupabase().auth.getSession();
    },
    onAuthStateChange: (callback: (event: any, session: any) => void) => {
      return getSupabase().auth.onAuthStateChange(callback);
    },
  },
  from: (table: string) => {
    return getSupabase().from(table);
  },
  channel: (name: string) => {
    return getSupabase().channel(name);
  },
};
