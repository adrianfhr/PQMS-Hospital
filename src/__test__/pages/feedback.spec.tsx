import { render, fireEvent, waitFor } from '@testing-library/react';
import Feedback from '@pages/feedback';
import { mockRouter } from './mockNextRouter';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));



describe('Feedback Component', () => {
    beforeAll(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    }
    );

    test('Renders Feedback component correctly', () => {
        const { queryAllByText, getByPlaceholderText } = render(<Feedback />);
        
        const beriMasukanElements = queryAllByText('Beri Masukan');
        const beriMasukanSekarangElements = queryAllByText('Beri Masukan Sekarang!');
    
        beriMasukanElements.forEach((element) => {
          expect(element).toBeInTheDocument();
        });
    
        beriMasukanSekarangElements.forEach((element) => {
          expect(element).toBeInTheDocument();
        });
    
        expect(getByPlaceholderText('Masukkan Nama')).toBeInTheDocument();
        expect(getByPlaceholderText('Masukkan Email')).toBeInTheDocument();
        // Add other specific assertions or validations here.
      });

      test('Entering feedback and submitting form', async () => {
        const { getByPlaceholderText, getByText } = render(<Feedback />);
    
        const nameInput = getByPlaceholderText('Masukkan Nama');
        const emailInput = getByPlaceholderText('Masukkan Email');
        const commentInput = getByPlaceholderText('Tambahkan Komentar...');
    
        // Simulate input change
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(commentInput, { target: { value: 'Great website!' } });
    
        // Submit the form
        fireEvent.click(getByText('Kirim'));
    
        // Wait for asynchronous behavior, such as form submission and input reset.
        await waitFor(() => {
          expect(nameInput).toHaveValue('John Doe');
          expect(emailInput).toHaveValue('john@example.com');
          expect(commentInput).toHaveValue('Great website!');
        });
      });
  // Add more tests as needed.
});
