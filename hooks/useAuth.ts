import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // In demo mode, immediately set a mock user
    const mockUser = {
      id: 'demo-user',
      email: 'demo@solimesh.local',
      created_at: new Date().toISOString(),
    };
    
    // Check if we have a stored user from previous login
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('solimesh_user') : null;
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(mockUser);
      }
    }
    
    setLoading(false);
  }, [setUser, setLoading]);

  return { user, loading };
}
