'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useContacts } from '@/hooks/useContacts';

export default function Contacts() {
  const { user } = useAuth();
  const { contacts, isLoading, addContact, updateContact } = useContacts(user?.id);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_type: 'friend' as const,
    phone: '',
    email: '',
    notes: '',
  });
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addContact.mutateAsync({
        ...formData,
        user_id: user.id,
        last_contact_date: new Date().toISOString(),
      });
      setFormData({
        contact_name: '',
        contact_type: 'friend',
        phone: '',
        email: '',
        notes: '',
      });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add contact:', err);
    }
  };

  const handleUpdateLastContact = async (contactId: string) => {
    try {
      await updateContact.mutateAsync({
        id: contactId,
        last_contact_date: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to update contact:', err);
    }
  };

  const getDaysSinceContact = (lastContactDate: string) => {
    const days = Math.floor(
      (Date.now() - new Date(lastContactDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const getHealthBadge = (days: number) => {
    if (days > 3) return { color: 'badge-cyber-pink', text: `${days}d ago` };
    if (days > 1) return { color: 'badge-cyber', text: `${days}d ago` };
    return { color: 'badge-cyber-purple', text: 'Today' };
  };

  return (
    <div className="min-h-screen bg-gradient-cyber">
      {/* Navigation */}
      <nav className="nav-cyber sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient-cyan">◆ Solimesh</h1>
          <div className="flex gap-6">
            <Link href="/scanner" className="nav-link">Scanner</Link>
            <Link href="/pantry" className="nav-link">Pantry</Link>
            <Link href="/mesh" className="nav-link">Mesh</Link>
            <Link href="/settings" className="nav-link">Settings</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-gradient-cyan mb-2">🤝 Support Contacts</h1>
            <p className="text-cyber-text2">Track and nurture your relationships</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? 'btn-cyber-outline-pink' : 'btn-cyber'}
          >
            {showForm ? 'Cancel' : 'Add Contact'}
          </button>
        </div>

        {/* Add Contact Form */}
        {showForm && (
          <div className="card-cyber-purple p-8 mb-8">
            <h2 className="text-2xl font-bold text-cyber-accent3 mb-6">New Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-cyber-text mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.contact_name}
                    onChange={(e) =>
                      setFormData({ ...formData, contact_name: e.target.value })
                    }
                    placeholder="Contact name"
                    className="input-cyber"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyber-text mb-2">Type</label>
                  <select
                    value={formData.contact_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_type: e.target.value as any,
                      })
                    }
                    className="select-cyber"
                  >
                    <option value="friend">Friend</option>
                    <option value="family">Family</option>
                    <option value="neighbor">Neighbor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyber-text mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                    className="input-cyber"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyber-text mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                    className="input-cyber"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-cyber-text mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Add notes about this contact..."
                  className="textarea-cyber"
                  rows={3}
                />
              </div>

              <button type="submit" className="btn-cyber w-full">
                Add Contact
              </button>
            </form>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="card-cyber p-12 text-center">
            <div className="w-12 h-12 border-4 border-cyber-accent border-t-cyber-accent2 rounded-full animate-spin mx-auto mb-4 shadow-glow-cyan"></div>
            <p className="text-cyber-text">Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="card-cyber p-12 text-center">
            <p className="text-cyber-text2 mb-6 text-lg">No contacts yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-cyber"
            >
              Add Your First Contact
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => {
              const daysSince = getDaysSinceContact(contact.last_contact_date);
              const badge = getHealthBadge(daysSince);
              return (
                <div
                  key={contact.id}
                  className="card-cyber-pink p-6 hover:scale-102 transition-transform"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-cyber-accent2 mb-1">{contact.contact_name}</h3>
                      <p className="text-sm text-cyber-text2 capitalize">{contact.contact_type}</p>
                    </div>
                    <div className={badge.color}>
                      {badge.text}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {contact.email && (
                      <p className="text-sm text-cyber-text2">
                        📧 <span className="text-cyber-accent2">{contact.email}</span>
                      </p>
                    )}
                    {contact.phone && (
                      <p className="text-sm text-cyber-text2">
                        📱 <span className="text-cyber-accent2">{contact.phone}</span>
                      </p>
                    )}
                    {contact.notes && (
                      <p className="text-sm text-cyber-text2 italic">💭 {contact.notes}</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleUpdateLastContact(contact.id)}
                    className="btn-cyber-secondary px-6 py-2 text-sm"
                  >
                    Mark as Contacted
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
