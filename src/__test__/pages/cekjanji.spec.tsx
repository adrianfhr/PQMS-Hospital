import { render } from '@testing-library/react';
import { mockRouter } from './mockNextRouter';
import { useRouter } from 'next/router';
import Cekjanji from '@pages/cekjanji';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Cekjanji Component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders successfully', () => {
    const page = render(<Cekjanji />);
    expect(page).toBeTruthy();
  });
});
