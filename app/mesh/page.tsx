'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useMeshStore } from '@/store/meshStore';
import { supabase } from '@/lib/supabase';

export default function Mesh() {
  const { user } = useAuth();
  const { signals, setSignals, addSignal } = useMeshStore();
  const [stressLevel, setStressLevel] = useState(5);
  const [selectedItem, setSelectedItem] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const fetchSignals = async () => {
      const { data, error } = await supabase
        .from('abundance_signals')
        .select('*')
        .eq('signal_status', 'active')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSignals(data);
      }
    };

    fetchSignals();

    const subscription = supabase
      .channel('abundance_signals')
      .on(
        'broadcast' as any,
        { event: 'signal_update' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            addSignal(payload.new as any);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, setSignals, addSignal, router]);

  const handleCreateSignal = async () => {
    if (!selectedItem) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('abundance_signals')
        .insert([
          {
            user_id: user?.id,
            item_id: selectedItem,
            location: { lat: 0, lng: 0 },
            stress_level: stressLevel,
            signal_status: 'active',
            expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          },
        ])
        .select();

      if (!error && data) {
        addSignal(data[0]);
        setSelectedItem('');
        setStressLevel(5);
      }
    } catch (err) {
      console.error('Failed to create signal:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-cyber">
      {/* Navigation */}
      <nav className="nav-cyber sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient-cyan">◆ Solimesh</h1>
          <div className="flex gap-6">
            <Link href="/scanner" className="nav-link">Scanner</Link>
            <Link href="/pantry" className="nav-link">Pantry</Link>
            <Link href="/contacts" className="nav-link">Contacts</Link>
            <Link href="/settings" className="nav-link">Settings</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gradient-cyan mb-2">🗺️ Mutual Aid Mesh</h1>
          <p className="text-cyber-text2">Share abundance and connect with your community</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Signal Card */}
          <div className="lg:col-span-1">
            <div className="card-cyber-purple p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-cyber-accent3 mb-6">Broadcast Signal</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-cyber-text mb-2">
                    Item to Share
                  </label>
                  <input
                    type="text"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    placeholder="e.g., Fresh tomatoes"
                    className="input-cyber"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyber-text mb-3">
                    Stress Level: <span className="text-cyber-accent3">{stressLevel}/10</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-cyber-surface rounded-lg appearance-none cursor-pointer accent-cyber-accent3"
                  />
                  <div className="flex justify-between text-xs text-cyber-text2 mt-2">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <button
                  onClick={handleCreateSignal}
                  disabled={loading || !selectedItem}
                  className="btn-cyber w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-cyber-dark border-t-transparent rounded-full animate-spin"></div>
                      Broadcasting...
                    </span>
                  ) : (
                    'Broadcast Signal'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Active Signals */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-cyber-accent mb-6">
              Active Signals <span className="text-cyber-accent2">({signals.length})</span>
            </h2>

            {signals.length === 0 ? (
              <div className="card-cyber p-12 text-center">
                <p className="text-cyber-text2 text-lg">No active signals nearby</p>
                <p className="text-cyber-text2 text-sm mt-2">Be the first to share!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {signals.map((signal) => (
                  <div
                    key={signal.id}
                    className="card-cyber p-6 border-l-4 border-cyber-accent hover:scale-102 transition-transform"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-cyber-accent mb-2">Item Available</h3>
                        <div className="space-y-2">
                          <p className="text-sm text-cyber-text2">
                            Stress Level: <span className="text-cyber-accent2 font-semibold">{signal.stress_level}/10</span>
                          </p>
                          <p className="text-sm text-cyber-text2">
                            Posted: <span className="text-cyber-accent">{new Date(signal.created_at).toLocaleTimeString()}</span>
                          </p>
                        </div>
                      </div>
                      <button className="btn-cyber-secondary px-6 py-2 text-sm">
                        Claim
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
