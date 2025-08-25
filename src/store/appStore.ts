import { create } from 'zustand';
import type { FormData, SubmittedData, Country } from '../types/form';

interface AppState {
  submittedData: SubmittedData[];
  countries: Country[];
  lastSubmittedId: string | null;
  addSubmittedData: (
    data: FormData,
    formType: 'uncontrolled' | 'react-hook-form'
  ) => void;
  loadCountries: () => void;
  clearLastSubmittedId: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  submittedData: [],
  countries: [],
  lastSubmittedId: null,

  addSubmittedData: (data: FormData, formType) => {
    const id = Date.now().toString();

    const newSubmittedData: SubmittedData = {
      ...data,
      id,
      submittedAt: new Date(),
      formType,
    };

    set((state) => ({
      submittedData: [...state.submittedData, newSubmittedData],
      lastSubmittedId: id,
    }));
  },

  loadCountries: () => {
    const countries: Country[] = [
      { code: 'BY', name: 'Беларусь' },
      { code: 'RU', name: 'Россия' },
      { code: 'UA', name: 'Украина' },
      { code: 'PL', name: 'Польша' },
      { code: 'US', name: 'США' },
      { code: 'DE', name: 'Германия' },
      { code: 'FR', name: 'Франция' },
      { code: 'GB', name: 'Великобритания' },
      { code: 'CA', name: 'Канада' },
      { code: 'AU', name: 'Австралия' },
    ];

    set({ countries });
  },

  clearLastSubmittedId: () => set({ lastSubmittedId: null }),
}));
