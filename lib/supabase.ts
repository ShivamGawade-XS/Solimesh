'use client';

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

// Demo mode - always works without Supabase
export const supabase = {
  auth: {
    signUp: async (credentials: { email: string; password: string }) => {
      // Always return demo response
      return {
        data: { 
          user: generateMockUser(credentials.email),
          session: null 
        },
        error: null,
      };
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      // Always return demo response
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
      return { error: null };
    },
    getSession: async () => {
      return { data: { session: null } };
    },
    onAuthStateChange: (callback: (event: any, session: any) => void) => {
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
    // Mock query builder
    return {
      select: (_columns?: string) => ({
        eq: (_column: string, _value: any) => ({
          order: (_column: string, _options?: any) => 
            Promise.resolve({ data: [], error: null }),
        }),
      }),
      insert: (_data: any) => ({
        select: () => Promise.resolve({ data: [], error: null }),
      }),
      update: (_data: any) => ({
        eq: (_column: string, _value: any) => ({
          select: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
      delete: () => ({
        eq: (_column: string, _value: any) => 
          Promise.resolve({ error: null }),
      }),
    };
  },
  channel: (name: string) => {
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
