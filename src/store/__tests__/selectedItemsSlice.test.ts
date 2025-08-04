import selectedItemsReducer, {
  togglePetSelection,
  unselectAllPets,
} from '../selectedItemsSlice';

describe('selectedItemsSlice', () => {
  const initialState = {
    selectedPets: [],
  };

  it('should handle initial state', () => {
    expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual({
      selectedPets: [],
    });
  });

  it('should handle togglePetSelection for adding pet', () => {
    const testPet = {
      id: 1,
      name: 'Test Pet',
      status: 'available' as const,
      photoUrls: [],
    };

    const actual = selectedItemsReducer(
      initialState,
      togglePetSelection(testPet)
    );
    expect(actual.selectedPets).toEqual([testPet]);
  });

  it('should handle togglePetSelection for removing pet', () => {
    const testPet = {
      id: 1,
      name: 'Test Pet',
      status: 'available' as const,
      photoUrls: [],
    };

    const stateWithPet = {
      selectedPets: [testPet],
    };

    const actual = selectedItemsReducer(
      stateWithPet,
      togglePetSelection(testPet)
    );
    expect(actual.selectedPets).toEqual([]);
  });

  it('should handle unselectAllPets', () => {
    const stateWithPets = {
      selectedPets: [
        {
          id: 1,
          name: 'Pet 1',
          status: 'available' as const,
          photoUrls: [],
        },
        {
          id: 2,
          name: 'Pet 2',
          status: 'pending' as const,
          photoUrls: [],
        },
      ],
    };

    const actual = selectedItemsReducer(stateWithPets, unselectAllPets());
    expect(actual.selectedPets).toEqual([]);
  });

  it('should not modify state for unknown action', () => {
    const state = {
      selectedPets: [
        {
          id: 1,
          name: 'Test Pet',
          status: 'available' as const,
          photoUrls: [],
        },
      ],
    };

    const actual = selectedItemsReducer(state, { type: 'unknown' });
    expect(actual).toBe(state);
  });
});
