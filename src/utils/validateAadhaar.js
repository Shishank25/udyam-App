// utils/validateAadhaar.js
export function validateAadhaar(value) {
  if (!/^\d+$/.test(value)) return false; // numbers only
  if (value.length !== 12) return false; // exactly 12 digits
  return true;
}
