export const AUTH_TOKEN_KEY = 'token';
export const AUTH_TOKEN_VALUE = 'authenticated';

export function isSessionAuthenticated(storage: Storage = localStorage): boolean {
  return storage.getItem(AUTH_TOKEN_KEY) === AUTH_TOKEN_VALUE;
}

export function setSessionAuthenticated(storage: Storage = localStorage): void {
  storage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN_VALUE);
}

export function clearSession(storage: Storage = localStorage): void {
  storage.removeItem(AUTH_TOKEN_KEY);
}

export function validateDemoCredentials(username: string, password: string): boolean {
  return username === 'admin' && password === 'admin';
}
