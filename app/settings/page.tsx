'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/uiStore';
import { supabase } from '@/lib/supabase';

export default function Settings() {
  const { user } = useAuth();
  const {
    lowStimulationMode,
    fontSize,
    highContrast,
    reducedMotion,
    toggleLowStimulation,
    setFontSize,
    toggleHighContrast,
    toggleReducedMotion,
  } = useUIStore();
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const ToggleButton = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-cyber-accent to-cyber-accent3 text-cyber-dark shadow-glow-cyan'
          : 'bg-cyber-surface border border-cyber-accent/30 text-cyber-text2 hover:border-cyber-accent/60'
      }`}
    >
      {active ? 'Enabled' : 'Disabled'}
    </button>
  );

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
            <Link href="/mesh" className="nav-link">Mesh</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gradient-cyan mb-2">⚙️ Settings</h1>
          <p className="text-cyber-text2">Customize your experience</p>
        </div>

        {/* Accessibility Section */}
        <div className="card-cyber-purple p-8 mb-8">
          <h2 className="text-2xl font-bold text-cyber-accent3 mb-8">Accessibility</h2>

          <div className="space-y-6">
            {/* Low Stimulation Mode */}
            <div className="flex justify-between items-center p-4 bg-cyber-surface rounded-lg border border-cyber-accent3/30">
              <div>
                <p className="font-semibold text-cyber-text">Low Stimulation Mode</p>
                <p className="text-sm text-cyber-text2 mt-1">
                  Monochromatic colors, reduced animations
                </p>
              </div>
              <ToggleButton active={lowStimulationMode} onClick={toggleLowStimulation} />
            </div>

            {/* High Contrast */}
            <div className="flex justify-between items-center p-4 bg-cyber-surface rounded-lg border border-cyber-accent3/30">
              <div>
                <p className="font-semibold text-cyber-text">High Contrast</p>
                <p className="text-sm text-cyber-text2 mt-1">
                  Increased text contrast for better readability
                </p>
              </div>
              <ToggleButton active={highContrast} onClick={toggleHighContrast} />
            </div>

            {/* Reduced Motion */}
            <div className="flex justify-between items-center p-4 bg-cyber-surface rounded-lg border border-cyber-accent3/30">
              <div>
                <p className="font-semibold text-cyber-text">Reduced Motion</p>
                <p className="text-sm text-cyber-text2 mt-1">
                  Minimize animations and transitions
                </p>
              </div>
              <ToggleButton active={reducedMotion} onClick={toggleReducedMotion} />
            </div>

            {/* Font Size */}
            <div className="flex justify-between items-center p-4 bg-cyber-surface rounded-lg border border-cyber-accent3/30">
              <div>
                <p className="font-semibold text-cyber-text">Font Size</p>
                <p className="text-sm text-cyber-text2 mt-1">
                  Adjust text size for readability
                </p>
              </div>
              <select
                value={fontSize}
                onChange={(e) =>
                  setFontSize(e.target.value as 'small' | 'medium' | 'large')
                }
                className="select-cyber w-32"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="card-cyber p-8 mb-8">
          <h2 className="text-2xl font-bold text-cyber-accent mb-8">Account</h2>

          <div className="space-y-6">
            {/* Email */}
            <div className="p-4 bg-cyber-surface rounded-lg border border-cyber-accent/30">
              <p className="text-sm text-cyber-text2 mb-1">Email Address</p>
              <p className="font-semibold text-cyber-accent">{user.email}</p>
            </div>

            {/* Account Created */}
            <div className="p-4 bg-cyber-surface rounded-lg border border-cyber-accent/30">
              <p className="text-sm text-cyber-text2 mb-1">Account Created</p>
              <p className="font-semibold text-cyber-accent">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn-cyber-outline-pink w-full mt-6"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="card-cyber-pink p-8">
          <h2 className="text-2xl font-bold text-cyber-accent2 mb-4">About Solimesh</h2>
          <div className="space-y-3 text-cyber-text2 text-sm">
            <p>Version: 1.0.0 (MVP)</p>
            <p>License: MIT</p>
            <p>
              Solimesh is a zero-cost, offline-first PWA for community resilience.
            </p>
            <p className="text-cyber-text2 italic">
              Built with ❤️ for sustainable communities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
