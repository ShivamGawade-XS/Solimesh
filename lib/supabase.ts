'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.warn('Supabase environment variables not configured. Running in demo mode.');
      return null;
    }

    try {
      supabaseClient = createClient(url, key);
    } catch (error) {
      console.error('Failed to initialize Supabase:', error);
      return null;
    }
  }

  return supabaseClient;
}

// Mock query builder for demo mode
const mockQueryBuilder = {
  select: () => ({
    eq: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
    }),
  }),
  insert: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
  }),
  update: () => ({
    eq: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
    }),
  }),
  delete: () => ({
    eq: () => Promise.resolve({ error: null }),
  }),
};

// Create a proxy that returns mock responses when Supabase is not configured
export const supabase = {
  auth: {
    signUp: async (credentials: { email: string; password: string }) => {
      const client = getSupabase();
      if (!client) {
        return {
          data: { 
            user: { 
              id: 'mock-user-' + Math.random().toString(36).substr(2, 9),
              email: credentials.email, 
              created_at: new Date().toISOString() 
            }, 
            session: null 
          },
          error: null,
        };
      }
      return client.auth.signUp(credentials);
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      const client = getSupabase();
      if (!client) {
        return {
          data: { 
            user: { 
              id: 'mock-user-' + Math.random().toString(36).substr(2, 9),
              email: credentials.email, 
              created_at: new Date().toISOString() 
            }, 
            session: null 
          },
          error: null,
        };
      }
      return client.auth.signInWithPassword(credentials);
    },
    signOut: async () => {
      const client = getSupabase();
      if (!client) return { error: null };
      return client.auth.signOut();
    },
    getSession: async () => {
      const client = getSupabase();
      if (!client) return { data: { session: null } };
      return client.auth.getSession();
    },
    onAuthStateChange: (callback: (event: any, session: any) => void) => {
      const client = getSupabase();
      if (!client) {
        return {
          data: {
            subscription: {
              unsubscribe: () => {},
            },
          },
        };
      }
      return client.auth.onAuthStateChange(callback);
    },
  },
  from: (table: string) => {
    const client = getSupabase();
    if (!client) {
      return {
        select: (columns?: string) => ({
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
    }
    return client.from(table);
  },
  channel: (name: string) => {
    const client = getSupabase();
    if (!client) {
      return {
        on: (type: string, filter: any, callback: any) => ({
          subscribe: () => ({
            unsubscribe: () => {},
          }),
        }),
      };
    }
    return client.channel(name);
  },
};
