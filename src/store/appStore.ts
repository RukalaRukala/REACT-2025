import { create } from 'zustand';
import type { UserFormData, SubmittedData, Country } from '../types/form';

interface AppState {
  submittedData: SubmittedData[];
  countries: Country[];
  lastSubmittedId: string | null;
  addSubmittedData: (
    data: UserFormData,
    formType: 'uncontrolled' | 'react-hook-form'
  ) => void;
  loadCountries: () => void;
  clearLastSubmittedId: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  submittedData: [],
  countries: [],
  lastSubmittedId: null,

  addSubmittedData: (data: UserFormData, formType) => {
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
      { code: 'BY', name: 'Belarus' },
      { code: 'RU', name: 'Russia' },
      { code: 'UA', name: 'Ukraine' },
      { code: 'PL', name: 'Poland' },
      { code: 'US', name: 'United States' },
      { code: 'DE', name: 'Germany' },
      { code: 'FR', name: 'France' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'CA', name: 'Canada' },
      { code: 'AU', name: 'Australia' },
    ];

    set({ countries });
  },

  clearLastSubmittedId: () => set({ lastSubmittedId: null }),
}));
