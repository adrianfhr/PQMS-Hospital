import { render, screen } from '@testing-library/react';
import Sukses from '@pages/sukses';
import { mockRouter } from './mockNextRouter';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Sukses Component', () => {
    beforeAll(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });
  
    it('renders successfully', () => {
        const page = render(<Sukses />);
        expect(page).toBeTruthy();
    }); 
  });

