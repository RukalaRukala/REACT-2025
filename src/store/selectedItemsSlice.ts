import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pet } from '../components/Search/Search.model.tsx';

interface SelectedItemsState {
  selectedPets: Pet[];
}

const initialState: SelectedItemsState = {
  selectedPets: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    togglePetSelection: (state, action: PayloadAction<Pet>) => {
      const pet = action.payload;
      const existingIndex = state.selectedPets.findIndex(
        (p: Pet) => p.id === pet.id
      );

      if (existingIndex >= 0) {
        state.selectedPets = state.selectedPets.filter(
          (p: Pet) => p.id !== pet.id
        );
      } else {
        state.selectedPets = [...state.selectedPets, pet];
      }
    },
    unselectAllPets: (state) => {
      state.selectedPets = [];
    },
  },
});

export const { togglePetSelection, unselectAllPets } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
