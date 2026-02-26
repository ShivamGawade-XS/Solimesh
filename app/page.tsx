'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-cyber">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-accent border-t-cyber-accent2 rounded-full animate-spin mx-auto mb-4 shadow-glow-cyan"></div>
          <p className="text-cyber-text text-lg">Initializing Solimesh...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-cyber overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyber-accent2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyber-accent3/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="nav-cyber sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-gradient-cyan">◆ Solimesh</div>
              </div>
              <div className="flex gap-6">
                <a href="#features" className="nav-link">Features</a>
                <a href="#about" className="nav-link">About</a>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold mb-6 text-gradient-neon">
                Solimesh 🌱
              </h1>
              <p className="text-2xl text-cyber-text2 mb-8 max-w-3xl mx-auto leading-relaxed">
                Community resilience through AI-powered pantry tracking and real-time mutual aid
              </p>
              <p className="text-cyber-text2 mb-12 max-w-2xl mx-auto">
                Transform individual pantry tracking into a community resilience network. Reduce food waste, strengthen relationships, and build local mutual aid.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-6 justify-center flex-wrap">
                <Link href="/auth/login" className="btn-cyber">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-cyber-secondary">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              {/* Feature 1 */}
              <div className="card-cyber p-6 group hover:scale-105">
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-xl font-bold text-cyber-accent mb-3">Smart Scanner</h3>
                <p className="text-cyber-text2 text-sm">
                  Snap photos of receipts and grocery items. AI extracts items and predicts shelf life automatically.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card-cyber-pink p-6 group hover:scale-105">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-cyber-accent2 mb-3">Neuro-Adaptive UI</h3>
                <p className="text-cyber-text2 text-sm">
                  Low-stimulation mode with high contrast and simplified navigation for accessibility.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card-cyber-purple p-6 group hover:scale-105">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-cyber-accent3 mb-3">Relationship Tracking</h3>
                <p className="text-cyber-text2 text-sm">
                  Track support contacts and get nudges to stay connected with your community.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="card-cyber p-6 group hover:scale-105">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-cyber-accent mb-3">Mutual Aid Mesh</h3>
                <p className="text-cyber-text2 text-sm">
                  Real-time map of local abundance signals connecting surplus food with those in need.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div id="about" className="mt-20 grid md:grid-cols-3 gap-8">
              <div className="card-cyber p-8 text-center">
                <div className="text-4xl font-bold text-gradient-cyan mb-2">0</div>
                <p className="text-cyber-text2">Cost to Deploy</p>
              </div>
              <div className="card-cyber-pink p-8 text-center">
                <div className="text-4xl font-bold text-gradient-pink mb-2">∞</div>
                <p className="text-cyber-text2">Scalability</p>
              </div>
              <div className="card-cyber-purple p-8 text-center">
                <div className="text-4xl font-bold text-cyber-accent3 mb-2">100%</div>
                <p className="text-cyber-text2">Open Source</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-20 card-cyber p-8">
              <h2 className="text-2xl font-bold text-gradient-cyan mb-6 text-center">Built with Modern Tech</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Next.js 15', 'React 19', 'Supabase', 'Gemini AI', 'TypeScript', 'Tailwind CSS', 'Zustand', 'TanStack Query'].map((tech) => (
                  <div key={tech} className="px-4 py-3 rounded-lg bg-cyber-surface border border-cyber-accent/30 text-center text-cyber-text hover:border-cyber-accent/60 transition-all">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 border-t border-cyber-accent/20 py-8">
            <div className="max-w-7xl mx-auto px-6 text-center text-cyber-text2">
              <p>Built with ❤️ for community resilience • MIT License</p>
            </div>
          </div>
        </div>
      </div>
    );
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
            <Link href="/mesh" className="nav-link">Mesh</Link>
            <Link href="/settings" className="nav-link">Settings</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="card-cyber p-8">
          <h2 className="text-3xl font-bold text-gradient-cyan mb-4">Welcome back, {user.email}!</h2>
          <p className="text-cyber-text2 mb-8">Start by scanning your first item or exploring the mesh.</p>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/scanner" className="card-cyber p-6 hover:scale-105 text-center">
              <div className="text-4xl mb-3">📸</div>
              <p className="font-semibold text-cyber-accent">Scan Item</p>
            </Link>
            <Link href="/pantry" className="card-cyber-pink p-6 hover:scale-105 text-center">
              <div className="text-4xl mb-3">🥫</div>
              <p className="font-semibold text-cyber-accent2">View Pantry</p>
            </Link>
            <Link href="/contacts" className="card-cyber-purple p-6 hover:scale-105 text-center">
              <div className="text-4xl mb-3">🤝</div>
              <p className="font-semibold text-cyber-accent3">Contacts</p>
            </Link>
            <Link href="/mesh" className="card-cyber p-6 hover:scale-105 text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <p className="font-semibold text-cyber-accent">Mesh</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
