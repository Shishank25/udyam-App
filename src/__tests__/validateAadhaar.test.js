// __tests__/validateAadhaar.test.js
import { validateAadhaar } from '@/utils/validateAadhaar';

describe('Aadhaar validation', () => {
  test('valid Aadhaar (12 digits)', () => {
    expect(validateAadhaar('123456789012')).toBe(true);
  });

  test('less than 12 digits is invalid', () => {
    expect(validateAadhaar('1234567890')).toBe(false);
  });

  test('more than 12 digits is invalid', () => {
    expect(validateAadhaar('1234567890123')).toBe(false);
  });

  test('non-numeric characters are invalid', () => {
    expect(validateAadhaar('1234abcd9012')).toBe(false);
  });
});
