import { render } from '@testing-library/react';
import { mockRouter } from '.././mockNextRouter';
import { useRouter } from 'next/router';
import Login from '@pages/auth/login';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Login Component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders successfully', () => {
    const page = render(<Login />);
    expect(page).toBeTruthy();
  });
});
