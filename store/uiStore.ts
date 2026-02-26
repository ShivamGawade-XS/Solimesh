import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  lowStimulationMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
  toggleLowStimulation: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
}

export const useUIStore = create<UIStore>(
  persist(
    (set) => ({
      lowStimulationMode: false,
      fontSize: 'medium',
      highContrast: false,
      reducedMotion: false,
      toggleLowStimulation: () =>
        set((state) => ({ lowStimulationMode: !state.lowStimulationMode })),
      setFontSize: (size) => set({ fontSize: size }),
      toggleHighContrast: () =>
        set((state) => ({ highContrast: !state.highContrast })),
      toggleReducedMotion: () =>
        set((state) => ({ reducedMotion: !state.reducedMotion })),
    }),
    {
      name: 'ui-store',
    }
  )
);
