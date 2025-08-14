beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'success' })
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynamicForm from '@/components/DynamicForm';
import '@testing-library/jest-dom';

test('goes from Step 1 → Step 2 and validates PAN', async () => {
  const mockSetCurrentStep = jest.fn();

  // --- Step 1 render ---
  const { rerender } = render(
    <DynamicForm currentStep={1} setCurrentStep={mockSetCurrentStep} />
  );

  // Fill Aadhaar details
  await userEvent.type(
    screen.getByRole('textbox', { name: /Name as per Aadhaar/i }),
    'John Doe'
  );
  await userEvent.type(
    screen.getByRole('textbox', { name: /Aadhaar Number/i }),
    '123456789012'
  );

    await userEvent.click(
        screen.getByRole('checkbox', { name: /aadhaar/i })
    );  

  // Click Step 1 submit button
  fireEvent.click(
    screen.getByRole('button', { name: /validate & generate otp/i })
  );

  // Ensure step was changed to 2
  expect(mockSetCurrentStep).toHaveBeenCalledWith(2);

  // --- Step 2 render ---
  rerender(
    <DynamicForm currentStep={2} setCurrentStep={mockSetCurrentStep} />
  );

  // Fill PAN details
  await userEvent.type(
    screen.getByRole('textbox', { name: /PAN Number/i }),
    'ABCDE1234F'
  );
  await userEvent.type(
    screen.getByRole('textbox', { name: /name as per pan/i }),
    'John Doe'
  );

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: /type of organisation/i }),
    '5' // "5. Private Limited Company"
  );

  await userEvent.type(
    screen.getByPlaceholderText(/dd\/mm\/yyyy/i), // matches placeholder "DD/MM/YYYY"
    '01/01/2000'
  );

  await userEvent.click(
    screen.getByRole('checkbox', { name: /pan/i })
    );  

  // Submit Step 2
  fireEvent.click(screen.getByRole('button', { name: /Validate PAN/i }));
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:4000/submit-form',
            expect.any(Object)
        );
        expect(mockSetCurrentStep).toHaveBeenCalledWith(3);
    })
});