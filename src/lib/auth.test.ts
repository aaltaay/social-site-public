import { describe, expect, it } from 'vitest';
import {
  AUTH_TOKEN_KEY,
  AUTH_TOKEN_VALUE,
  clearSession,
  isSessionAuthenticated,
  setSessionAuthenticated,
  validateDemoCredentials,
} from './auth';

describe('auth helpers', () => {
  it('accepts demo credentials only', () => {
    expect(validateDemoCredentials('admin', 'admin')).toBe(true);
    expect(validateDemoCredentials('admin', 'wrong')).toBe(false);
  });

  it('tracks demo session in storage', () => {
    const store = new Map<string, string>();
    const storage: Storage = {
      get length() {
        return store.size;
      },
      clear() {
        store.clear();
      },
      getItem(key: string) {
        return store.get(key) ?? null;
      },
      key(index: number) {
        return [...store.keys()][index] ?? null;
      },
      setItem(key: string, value: string) {
        store.set(key, value);
      },
      removeItem(key: string) {
        store.delete(key);
      },
    };

    expect(isSessionAuthenticated(storage)).toBe(false);
    setSessionAuthenticated(storage);
    expect(storage.getItem(AUTH_TOKEN_KEY)).toBe(AUTH_TOKEN_VALUE);
    expect(isSessionAuthenticated(storage)).toBe(true);
    clearSession(storage);
    expect(isSessionAuthenticated(storage)).toBe(false);
  });
});
