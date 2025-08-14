import { validatePAN } from "@/utils/validatePan";


describe('PAN Validation', () => {
  it('should return true for valid PAN', () => {
    expect(validatePAN('ABCDE1234F')).toBe(true);
  });

  it('should return false for invalid PAN', () => {
    expect(validatePAN('12345ABCD6')).toBe(false);
    expect(validatePAN('')).toBe(false);
    expect(validatePAN('ABCDE123')).toBe(false);
  });
});
