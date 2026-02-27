'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const messageParam = searchParams.get('message');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cyber flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyber-accent2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="card-cyber p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gradient-cyan mb-2">◆ Solimesh</h1>
            <p className="text-cyber-text2">Community resilience network</p>
          </div>

          {/* Messages */}
          {messageParam && (
            <div className="mb-6 p-4 rounded-lg bg-cyber-accent/20 border border-cyber-accent/50 text-cyber-accent">
              <p className="text-sm font-semibold">{messageParam}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-cyber-accent2/20 border border-cyber-accent2/50 text-cyber-accent2">
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
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

            {/* Password */}
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-cyber-secondary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-cyber-dark border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider-cyber my-6"></div>

          {/* Sign Up Link */}
          <p className="text-center text-cyber-text2">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-cyber-accent2 hover:text-cyber-accent font-semibold transition-colors">
              Sign up
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

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-cyber flex items-center justify-center"><div className="text-cyber-text">Loading...</div></div>}>
      <LoginContent />
    </Suspense>
  );
}
