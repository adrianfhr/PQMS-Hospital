import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import Spesialisasi from '@pages/spesialisasi';
import { mockRouter } from './mockNextRouter';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('Spesialisasi Component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  test('Renders Spesialisasi component correctly', () => {
    const { getAllByText } = render(<Spesialisasi />);
    const text = getAllByText('Spesialisasi');
    expect(text[0]).toBeInTheDocument();
    });
    }
    )

