import { render } from '@testing-library/react';
import { mockRouter } from '../mockNextRouter';
import { useRouter } from 'next/router';
import Dokter from '@pages/[category]/dokter';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Dokter Component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders successfully', () => {
    const page = render(<Dokter />);
    expect(page).toBeTruthy();
  });
});