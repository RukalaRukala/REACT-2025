export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  acceptTerms: boolean;
  profilePicture: string | null;
  country: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface SubmittedData extends FormData {
  id: string;
  submittedAt: Date;
  formType: 'uncontrolled' | 'react-hook-form';
}
