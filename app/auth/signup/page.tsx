'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // Store user in localStorage for demo mode
      const user = { 
        id: 'user-' + Math.random().toString(36).substr(2, 9), 
        email, 
        created_at: new Date().toISOString() 
      };
      localStorage.setItem('solimesh_user', JSON.stringify(user));
      
      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cyber flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyber-accent2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="card-cyber p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gradient-cyan mb-2">◆ Solimesh</h1>
            <p className="text-cyber-text2">Join the community resilience network</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-cyber-accent2/20 border border-cyber-accent2/50 text-cyber-accent2">
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-cyber-text mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-cyber"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-cyber-text mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-cyber"
                required
              />
              <p className="text-xs text-cyber-text2 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-cyber-text mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="input-cyber"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-cyber-secondary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-cyber-dark border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider-cyber my-6"></div>

          {/* Sign In Link */}
          <p className="text-center text-cyber-text2">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-cyber-accent2 hover:text-cyber-accent font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center text-cyber-text2 text-sm">
          <p>Zero-cost • Offline-first • Open source</p>
        </div>
      </div>
    </div>
  );
}
