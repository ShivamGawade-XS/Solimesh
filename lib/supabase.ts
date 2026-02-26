'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;
let isConfigured = false;

export function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!supabaseClient && !isConfigured) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && key) {
      try {
        supabaseClient = createClient(url, key);
        isConfigured = true;
      } catch (error) {
        console.warn('Supabase initialization failed. Running in demo mode.');
        isConfigured = false;
      }
    } else {
      console.log('Supabase not configured. Running in demo mode.');
      isConfigured = false;
    }
  }

  return supabaseClient;
}

// Mock user generator
const generateMockUser = (email: string) => ({
  id: 'mock-' + Math.random().toString(36).substr(2, 9),
  email,
  created_at: new Date().toISOString(),
  user_metadata: {},
  app_metadata: {},
  aud: 'authenticated',
  confirmation_sent_at: null,
  confirmed_at: new Date().toISOString(),
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  phone_confirmed_at: null,
  last_sign_in_at: new Date().toISOString(),
  role: 'authenticated',
  updated_at: new Date().toISOString(),
});

// Create a proxy that returns mock responses when Supabase is not configured
export const supabase = {
  auth: {
    signUp: async (credentials: { email: string; password: string }) => {
      const client = getSupabase();
      if (client) {
        try {
          return await client.auth.signUp(credentials);
        } catch (error) {
          console.warn('Supabase signup failed, using demo mode');
        }
      }
      
      // Demo mode response
      return {
        data: { 
          user: generateMockUser(credentials.email),
          session: null 
        },
        error: null,
      };
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      const client = getSupabase();
      if (client) {
        try {
          return await client.auth.signInWithPassword(credentials);
        } catch (error) {
          console.warn('Supabase login failed, using demo mode');
        }
      }
      
      // Demo mode response
      return {
        data: { 
          user: generateMockUser(credentials.email),
          session: {
            access_token: 'mock-token-' + Math.random().toString(36).substr(2, 9),
            token_type: 'bearer',
            expires_in: 3600,
            refresh_token: 'mock-refresh-' + Math.random().toString(36).substr(2, 9),
            user: generateMockUser(credentials.email),
          }
        },
        error: null,
      };
    },
    signOut: async () => {
      const client = getSupabase();
      if (client) {
        try {
          return await client.auth.signOut();
        } catch (error) {
          console.warn('Supabase signout failed');
        }
      }
      return { error: null };
    },
    getSession: async () => {
      const client = getSupabase();
      if (client) {
        try {
          return await client.auth.getSession();
        } catch (error) {
          console.warn('Supabase getSession failed');
        }
      }
      return { data: { session: null } };
    },
    onAuthStateChange: (callback: (event: any, session: any) => void) => {
      const client = getSupabase();
      if (client) {
        try {
          return client.auth.onAuthStateChange(callback);
        } catch (error) {
          console.warn('Supabase onAuthStateChange failed');
        }
      }
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    },
  },
  from: (table: string) => {
    const client = getSupabase();
    if (client) {
      try {
        return client.from(table);
      } catch (error) {
        console.warn('Supabase from() failed');
      }
    }
    
    // Mock query builder
    return {
      select: (_columns?: string) => ({
        eq: (column: string, value: any) => ({
          order: (column: string, options?: any) => 
            Promise.resolve({ data: [], error: null }),
        }),
      }),
      insert: (data: any) => ({
        select: () => Promise.resolve({ data: [], error: null }),
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
      delete: () => ({
        eq: (column: string, value: any) => 
          Promise.resolve({ error: null }),
      }),
    };
  },
  channel: (name: string) => {
    const client = getSupabase();
    if (client) {
      try {
        return client.channel(name);
      } catch (error) {
        console.warn('Supabase channel() failed');
      }
    }
    
    // Mock channel
    return {
      on: (type: string, filter: any, callback: any) => ({
        subscribe: () => ({
          unsubscribe: () => {},
        }),
      }),
    };
  },
};
