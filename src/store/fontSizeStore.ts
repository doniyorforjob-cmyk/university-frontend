import {create} from 'zustand';

interface FontSizeState {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const useFontSizeStore = create<FontSizeState>((set) => ({
  fontSize: 15, // Standart shrift o'lchami
  increaseFontSize: () => set({ fontSize: 19 }), // Katta shrift o'lchami
  decreaseFontSize: () => set({ fontSize: 13 }), // Kichik shrift o'lchami
  resetFontSize: () => set({ fontSize: 15 }), // Standart o'lchamga qaytarish
}));

export default useFontSizeStore;