import { create } from 'zustand';
import { AbundanceSignal } from '@/types';

interface MeshStore {
  signals: AbundanceSignal[];
  setSignals: (signals: AbundanceSignal[]) => void;
  addSignal: (signal: AbundanceSignal) => void;
  updateSignal: (id: string, updates: Partial<AbundanceSignal>) => void;
}

export const useMeshStore = create<MeshStore>((set) => ({
  signals: [],
  setSignals: (signals) => set({ signals }),
  addSignal: (signal) =>
    set((state) => ({ signals: [...state.signals, signal] })),
  updateSignal: (id, updates) =>
    set((state) => ({
      signals: state.signals.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
}));
