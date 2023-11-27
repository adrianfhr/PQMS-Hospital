import { render } from '@testing-library/react';
import { mockRouter } from '../mockNextRouter';
import { useRouter } from 'next/router';
import Register from '@pages/auth/register';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Register Component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders successfully', () => {
    const page = render(<Register />);
    expect(page).toBeTruthy();
  });
});