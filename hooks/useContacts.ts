import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { SupportContact } from '@/types';

export function useContacts(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('support_contacts')
        .select('*')
        .eq('user_id', userId)
        .order('last_contact_date', { ascending: false });
      if (error) throw error;
      return data as SupportContact[];
    },
    enabled: !!userId,
  });

  const addContact = useMutation({
    mutationFn: async (contact: Omit<SupportContact, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('support_contacts')
        .insert([contact])
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts', userId] });
    },
  });

  const updateContact = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SupportContact> & { id: string }) => {
      const { data, error } = await supabase
        .from('support_contacts')
        .update(updates)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts', userId] });
    },
  });

  return { contacts, isLoading, addContact, updateContact };
}
