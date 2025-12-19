// Input validation and sanitization utilities

/**
 * Sanitizes a string by removing potentially dangerous characters
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets to prevent XSS
    .replace(/[{}]/g, '') // Remove curly braces
    .slice(0, 200); // Limit length
};

/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if email is from an institutional domain
 * (basic check - could be expanded)
 */
export const isInstitutionalEmail = (email: string): boolean => {
  const institutionalDomains = ['edu', 'ac.uk', 'edu.au', 'edu.br', 'gov'];
  const domain = email.split('@')[1]?.toLowerCase() || '';

  // Check if ends with common institutional domains
  return institutionalDomains.some(inst => domain.endsWith(`.${inst}`)) ||
         domain.endsWith('.edu'); // .edu TLD
};

/**
 * Validates a zip code (basic check)
 */
export const isValidZipCode = (zip: string): boolean => {
  // Allow various formats: 12345, 12345-6789, A1A 1A1, etc.
  const zipRegex = /^[A-Za-z0-9\s\-]{3,10}$/;
  return zipRegex.test(zip);
};

/**
 * Validates a name (no numbers or special chars)
 */
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/;
  return nameRegex.test(name);
};

/**
 * Validates street address
 */
export const isValidStreet = (street: string): boolean => {
  return street.trim().length >= 5 && street.trim().length <= 200;
};

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  street?: string;
  zip?: string;
  country?: string;
}

/**
 * Validates checkout form data
 */
export const validateCheckoutForm = (data: {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  zip: string;
  country: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (!isValidName(data.firstName)) {
    errors.firstName = 'Invalid first name';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (!isValidName(data.lastName)) {
    errors.lastName = 'Invalid last name';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (!data.street.trim()) {
    errors.street = 'Street address is required';
  } else if (!isValidStreet(data.street)) {
    errors.street = 'Invalid street address';
  }

  if (!data.zip.trim()) {
    errors.zip = 'Zip code is required';
  } else if (!isValidZipCode(data.zip)) {
    errors.zip = 'Invalid zip code';
  }

  if (!data.country.trim()) {
    errors.country = 'Please select a country';
  }

  return errors;
};
