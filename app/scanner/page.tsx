'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePantry } from '@/hooks/usePantry';
import { extractFoodItems } from '@/lib/gemini';

export default function Scanner() {
  const { user } = useAuth();
  const { addItem } = usePantry(user?.id);
  const [preview, setPreview] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setPreview(base64);
      setLoading(true);
      setError('');

      try {
        const extractedItems = await extractFoodItems(base64.split(',')[1]);
        setItems(extractedItems);
      } catch (err: any) {
        setError(err.message || 'Failed to extract items');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = (itemName: string) => {
    addItem({
      user_id: user.id,
      item_name: itemName,
      quantity: 1,
      unit: 'unit',
      expiry_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      storage_location: 'Pantry',
      storage_tips: 'Store in cool, dry place',
      image_url: preview || '',
    } as any);
    setItems(items.filter((i) => i !== itemName));
  };

  return (
    <div className="min-h-screen bg-gradient-cyber">
      {/* Navigation */}
      <nav className="nav-cyber sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient-cyan">◆ Solimesh</h1>
          <div className="flex gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/pantry" className="nav-link">Pantry</Link>
            <Link href="/settings" className="nav-link">Settings</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gradient-cyan mb-4">📸 Smart Scanner</h1>
          <p className="text-cyber-text2 text-lg">Upload a receipt or grocery image to extract items automatically</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-cyber-accent2/20 border border-cyber-accent2/50 text-cyber-accent2">
            {error}
          </div>
        )}

        {/* Upload Area */}
        <div className="card-cyber p-8 mb-8">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-12 border-2 border-dashed border-cyber-accent/50 rounded-xl text-center hover:border-cyber-accent hover:bg-cyber-accent/5 transition-all duration-300 group"
          >
            <p className="text-2xl font-bold text-gradient-cyan mb-2 group-hover:scale-110 transition-transform">
              ⬆️ Click to upload
            </p>
            <p className="text-cyber-text2">or drag and drop your image</p>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="card-cyber p-6 mb-8">
            <h3 className="text-lg font-bold text-cyber-accent mb-4">Image Preview</h3>
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-lg max-h-96 object-cover border border-cyber-accent/30"
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="card-cyber p-8 text-center">
            <div className="w-12 h-12 border-4 border-cyber-accent border-t-cyber-accent2 rounded-full animate-spin mx-auto mb-4 shadow-glow-cyan"></div>
            <p className="text-cyber-text">Extracting items with AI...</p>
          </div>
        )}

        {/* Extracted Items */}
        {items.length > 0 && (
          <div className="card-cyber-pink p-8">
            <h2 className="text-2xl font-bold text-cyber-accent2 mb-6">Extracted Items</h2>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-cyber-surface rounded-lg border border-cyber-accent2/30 hover:border-cyber-accent2/60 transition-all"
                >
                  <span className="text-cyber-text font-semibold">{item}</span>
                  <button
                    onClick={() => handleAddItem(item)}
                    className="btn-cyber-secondary px-6 py-2 text-sm"
                  >
                    Add to Pantry
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
