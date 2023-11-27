import { render } from '@testing-library/react';
import { mockRouter } from './mockNextRouter';
import { useRouter } from 'next/router';
import Soon from '@pages/soon';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Soon Page', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders without crashing', () => {
    const page = render(<Soon />);
    expect(page).toBeTruthy();
  });
});
