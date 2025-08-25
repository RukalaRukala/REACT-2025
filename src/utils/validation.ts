import * as yup from 'yup';

const getPasswordStrength = (password: string): number => {
  let strength = 0;

  if (/\d/.test(password)) strength++;

  if (/[A-Z]/.test(password)) strength++;

  if (/[a-z]/.test(password)) strength++;

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return strength;
};

export const formValidationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must contain at least 2 characters')
    .test(
      'first-letter-uppercase',
      'Name must start with a capital letter',
      (value) => {
        return value ? /^[A-Z]/.test(value) : false;
      }
    ),

  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .min(1, 'Age must be greater than 0')
    .max(120, 'Age cannot be greater than 120 years'),

  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .test(
      'password-strength',
      'Password must contain: 1 digit, 1 uppercase letter, 1 lowercase letter, 1 special character',
      (value) => {
        return value ? getPasswordStrength(value) === 4 : false;
      }
    ),

  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  gender: yup
    .string()
    .required('Please select gender')
    .oneOf(['male', 'female', 'other'], 'Please select a valid option'),

  acceptTerms: yup
    .boolean()
    .required('You must accept the terms')
    .oneOf([true], 'You must accept the terms and conditions'),

  profilePicture: yup.string().nullable(),

  country: yup.string().required('Please select a country'),
});

export { getPasswordStrength };
