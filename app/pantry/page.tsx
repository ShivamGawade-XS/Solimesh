'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePantry } from '@/hooks/usePantry';

export default function Pantry() {
  const { user } = useAuth();
  const { items, isLoading, deleteItem } = usePantry(user?.id);
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const days = Math.ceil(
      (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const getExpiryBadge = (days: number) => {
    if (days < 0) return { color: 'badge-cyber-pink', text: 'Expired' };
    if (days < 3) return { color: 'badge-cyber-pink', text: `${days}d left` };
    if (days < 7) return { color: 'badge-cyber', text: `${days}d left` };
    return { color: 'badge-cyber-purple', text: `${days}d left` };
  };

  return (
    <div className="min-h-screen bg-gradient-cyber">
      {/* Navigation */}
      <nav className="nav-cyber sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient-cyan">◆ Solimesh</h1>
          <div className="flex gap-6">
            <Link href="/scanner" className="nav-link">Scanner</Link>
            <Link href="/contacts" className="nav-link">Contacts</Link>
            <Link href="/mesh" className="nav-link">Mesh</Link>
            <Link href="/settings" className="nav-link">Settings</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-gradient-cyan mb-2">🥫 Pantry</h1>
            <p className="text-cyber-text2">Manage your food inventory</p>
          </div>
          <Link href="/scanner" className="btn-cyber">
            Scan Item
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="card-cyber p-12 text-center">
            <div className="w-12 h-12 border-4 border-cyber-accent border-t-cyber-accent2 rounded-full animate-spin mx-auto mb-4 shadow-glow-cyan"></div>
            <p className="text-cyber-text">Loading your pantry...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="card-cyber p-12 text-center">
            <p className="text-cyber-text2 mb-6 text-lg">Your pantry is empty</p>
            <Link href="/scanner" className="btn-cyber">
              Start Scanning
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => {
              const daysLeft = getDaysUntilExpiry(item.expiry_date);
              const badge = getExpiryBadge(daysLeft);
              return (
                <div
                  key={item.id}
                  className="card-cyber p-6 hover:scale-102 transition-transform"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-cyber-accent mb-2">{item.item_name}</h3>
                      <div className="flex gap-4 mb-3">
                        <span className="text-sm text-cyber-text2">
                          Qty: <span className="text-cyber-accent">{item.quantity} {item.unit}</span>
                        </span>
                        <span className="text-sm text-cyber-text2">
                          Location: <span className="text-cyber-accent">{item.storage_location}</span>
                        </span>
                      </div>
                      {item.storage_tips && (
                        <p className="text-sm text-cyber-text2 italic">💡 {item.storage_tips}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`${badge.color}`}>
                        {badge.text}
                      </div>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="btn-cyber-outline-pink px-4 py-2 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
