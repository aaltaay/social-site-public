import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AppRoutes } from './App';

describe('App routing', () => {
  it('shows login when session is missing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes isAuthenticated={false} setIsAuthenticated={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Frontend demo dashboard')).toBeTruthy();
    expect(screen.getByText(/Demo credentials only/i)).toBeTruthy();
  });

  it('shows dashboard when session is present', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes isAuthenticated={true} setIsAuthenticated={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Generate Content')).toBeTruthy();
    expect(screen.getByText('Demo mode')).toBeTruthy();
  });
});
