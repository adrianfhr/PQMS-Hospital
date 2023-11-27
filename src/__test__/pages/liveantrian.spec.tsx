import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Liveantrian from '@pages/liveantrian';
import { mockRouter } from './mockNextRouter';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Liveantrian Component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    }
    );
  
    it('renders correctly', () => {

        const page = render(<Liveantrian />);
        expect(page).toBeTruthy();
        

  });
});
