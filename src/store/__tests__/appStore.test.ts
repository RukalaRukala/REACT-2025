import { describe, it, expect, beforeEach } from '@jest/globals';
import { useAppStore } from '../appStore';
import type { UserFormData } from '../../types/form';

describe('AppStore (Zustand)', () => {
  beforeEach(() => {
    useAppStore.setState({
      submittedData: [],
      countries: [],
      lastSubmittedId: null,
    });
  });

  describe('Initial State', () => {
    it('должен иметь правильное начальное состояние', () => {
      const state = useAppStore.getState();

      expect(state.submittedData).toEqual([]);
      expect(state.countries).toEqual([]);
      expect(state.lastSubmittedId).toBeNull();
    });
  });

  describe('addSubmittedData Action', () => {
    const mockFormData: UserFormData = {
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      password: 'StrongPass123!',
      confirmPassword: 'StrongPass123!',
      gender: 'male' as const,
      acceptTerms: true,
      profilePicture: null,
      country: 'US',
    };

    it('должен добавлять новые данные формы для uncontrolled формы', () => {
      const store = useAppStore.getState();

      store.addSubmittedData(mockFormData, 'uncontrolled');

      const newState = useAppStore.getState();
      expect(newState.submittedData).toHaveLength(1);
      expect(newState.submittedData[0]).toMatchObject({
        ...mockFormData,
        formType: 'uncontrolled',
      });
      expect(newState.submittedData[0].id).toBeDefined();
      expect(newState.submittedData[0].submittedAt).toBeInstanceOf(Date);
    });

    it('должен добавлять новые данные формы для react-hook-form', () => {
      const store = useAppStore.getState();

      store.addSubmittedData(mockFormData, 'react-hook-form');

      const newState = useAppStore.getState();
      expect(newState.submittedData).toHaveLength(1);
      expect(newState.submittedData[0]).toMatchObject({
        ...mockFormData,
        formType: 'react-hook-form',
      });
    });

    it('должен генерировать разные ID для разных отправок', () => {
      const store = useAppStore.getState();

      store.addSubmittedData(mockFormData, 'uncontrolled');
      const firstState = useAppStore.getState();
      const firstId = firstState.submittedData[0].id;

      setTimeout(() => {
        store.addSubmittedData(mockFormData, 'react-hook-form');
        const secondState = useAppStore.getState();
        const secondId = secondState.submittedData[1].id;

        expect(firstId).not.toBe(secondId);
        expect(secondState.submittedData).toHaveLength(2);
      }, 1);
    });

    it('должен устанавливать lastSubmittedId при добавлении данных', () => {
      const store = useAppStore.getState();

      store.addSubmittedData(mockFormData, 'uncontrolled');

      const newState = useAppStore.getState();
      const submittedId = newState.submittedData[0].id;
      expect(newState.lastSubmittedId).toBe(submittedId);
    });
  });

  describe('loadCountries Action', () => {
    it('должен загружать список стран', () => {
      const store = useAppStore.getState();

      store.loadCountries();

      const newState = useAppStore.getState();
      expect(newState.countries).toHaveLength(10);
      expect(newState.countries).toContainEqual({
        code: 'BY',
        name: 'Belarus',
      });
      expect(newState.countries).toContainEqual({
        code: 'US',
        name: 'United States',
      });
      expect(newState.countries).toContainEqual({
        code: 'DE',
        name: 'Germany',
      });
    });

    it('должен загружать страны в правильном порядке', () => {
      const store = useAppStore.getState();

      store.loadCountries();

      const newState = useAppStore.getState();
      expect(newState.countries[0]).toEqual({ code: 'BY', name: 'Belarus' });
      expect(newState.countries[1]).toEqual({ code: 'RU', name: 'Russia' });
      expect(newState.countries[9]).toEqual({ code: 'AU', name: 'Australia' });
    });
  });

  describe('clearLastSubmittedId Action', () => {
    it('должен очищать lastSubmittedId', () => {
      useAppStore.setState({ lastSubmittedId: 'test-id-123' });

      const store = useAppStore.getState();
      expect(store.lastSubmittedId).toBe('test-id-123');

      store.clearLastSubmittedId();

      const newState = useAppStore.getState();
      expect(newState.lastSubmittedId).toBeNull();
    });

    it('должен работать корректно если lastSubmittedId уже null', () => {
      const store = useAppStore.getState();
      expect(store.lastSubmittedId).toBeNull();

      store.clearLastSubmittedId();

      const newState = useAppStore.getState();
      expect(newState.lastSubmittedId).toBeNull();
    });
  });

  describe('Store State Updates', () => {
    it('должен правильно обновлять состояние при последовательных действиях', () => {
      const mockFormData: UserFormData = {
        name: 'Test User',
        age: 30,
        email: 'test@example.com',
        password: 'TestPass123!',
        confirmPassword: 'TestPass123!',
        gender: 'female' as const,
        acceptTerms: true,
        profilePicture: null,
        country: 'CA',
      };

      const store = useAppStore.getState();

      store.loadCountries();
      let state = useAppStore.getState();
      expect(state.countries).toHaveLength(10);

      store.addSubmittedData(mockFormData, 'uncontrolled');
      state = useAppStore.getState();
      expect(state.submittedData).toHaveLength(1);
      expect(state.lastSubmittedId).toBeDefined();

      store.clearLastSubmittedId();
      state = useAppStore.getState();
      expect(state.lastSubmittedId).toBeNull();
      expect(state.submittedData).toHaveLength(1);
      expect(state.countries).toHaveLength(10);
    });
  });

  describe('Store Selectors', () => {
    it('должен предоставлять правильные данные через селекторы', () => {
      const store = useAppStore.getState();

      expect(store.submittedData).toEqual([]);
      expect(store.countries).toEqual([]);
      expect(store.lastSubmittedId).toBeNull();

      store.loadCountries();
      store.addSubmittedData(
        {
          name: 'Test',
          age: 25,
          email: 'test@example.com',
          password: 'Pass123!',
          confirmPassword: 'Pass123!',
          gender: 'male' as const,
          acceptTerms: true,
          profilePicture: null,
          country: 'US',
        },
        'uncontrolled'
      );

      const newState = useAppStore.getState();
      expect(newState.submittedData.length).toBe(1);
      expect(newState.countries.length).toBe(10);
      expect(newState.lastSubmittedId).not.toBeNull();
    });
  });
});
