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
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .test(
      'first-letter-uppercase',
      'Имя должно начинаться с заглавной буквы',
      (value) => {
        return value ? /^[A-ZА-Я]/.test(value) : false;
      }
    ),

  age: yup
    .number()
    .required('Возраст обязателен для заполнения')
    .positive('Возраст должен быть положительным числом')
    .integer('Возраст должен быть целым числом')
    .min(1, 'Возраст должен быть больше 0')
    .max(120, 'Возраст не может быть больше 120 лет'),

  email: yup
    .string()
    .required('Email обязателен для заполнения')
    .email('Введите корректный email адрес'),

  password: yup
    .string()
    .required('Пароль обязателен для заполнения')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .test(
      'password-strength',
      'Пароль должен содержать: 1 цифру, 1 заглавную букву, 1 строчную букву, 1 специальный символ',
      (value) => {
        return value ? getPasswordStrength(value) === 4 : false;
      }
    ),

  confirmPassword: yup
    .string()
    .required('Подтверждение пароля обязательно')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),

  gender: yup
    .string()
    .required('Выберите пол')
    .oneOf(['male', 'female', 'other'], 'Выберите корректный вариант'),

  acceptTerms: yup
    .boolean()
    .required('Необходимо принять условия')
    .oneOf([true], 'Вы должны принять условия использования'),

  profilePicture: yup.string().nullable(),

  country: yup.string().required('Выберите страну'),
});

export { getPasswordStrength };
