import { create } from 'zustand';

interface FontSizeState {
  fontSize: number | null; // null means "use CSS default"
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const useFontSizeStore = create<FontSizeState>((set) => ({
  fontSize: null, // Default: let CSS handle it (16px/18px)
  increaseFontSize: () => set((state) => ({ fontSize: (state.fontSize || 16) + 2 })),
  decreaseFontSize: () => set((state) => ({ fontSize: (state.fontSize || 16) - 2 })),
  resetFontSize: () => set({ fontSize: null }),
}));

export default useFontSizeStore;