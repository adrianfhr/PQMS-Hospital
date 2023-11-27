import { render } from '@testing-library/react';
import { mockRouter } from '../../mockNextRouter';
import { useRouter } from 'next/router';
import Landing from '@pages/index';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Landing Page', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders without crashing', () => {
    const page = render(<Landing />);
    expect(page).toBeTruthy();
  });
});

