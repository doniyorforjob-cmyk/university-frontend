import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

// @ts-ignore
const useThemeStore = create<ThemeState>((set: any) => ({
  isDark: false,
  toggleTheme: () => set((state: any) => ({ isDark: !state.isDark })),
}));

export default useThemeStore;
