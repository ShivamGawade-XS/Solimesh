import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const getSession = async () => {
      const result = await supabase.auth.getSession();
      const data = result as any;
      if (data?.data?.session?.user) {
        setUser({
          id: data.data.session.user.id,
          email: data.data.session.user.email || '',
          created_at: data.data.session.user.created_at || '',
        });
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            created_at: session.user.created_at || '',
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, [setUser, setLoading]);

  return { user, loading };
}
