import { render } from '@testing-library/react';
import { mockRouter } from '../../mockNextRouter';
import { useRouter } from 'next/router';
import Konfirmasi from '@pages/[category]/[id]/konfirmasi';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Konfirmasi Component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders successfully', () => {
    const page = render(<Konfirmasi />);
    expect(page).toBeTruthy();
  });
});

