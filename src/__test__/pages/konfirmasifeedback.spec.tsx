import { render } from '@testing-library/react';
import { mockRouter } from './mockNextRouter';
import { useRouter } from 'next/router';
import Konfirmasifeedback from '@pages/konfirmasifeedback';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Konfirmasifeedback Component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders correctly', () => {

      const page = render(<Konfirmasifeedback />);
      expect(page).toBeTruthy();

  

  });
});
