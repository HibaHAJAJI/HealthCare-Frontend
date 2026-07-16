import * as yup from 'yup';

export const patientSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Le nom complet est obligatoire')
    .min(3, 'Le nom doit contenir au moins 3 caractères'),
  email: yup
    .string()
    .email('Format d\'email invalide')
    .required('L\'adresse email est obligatoire'),
  phone: yup
    .string()
    .required('Le numéro de téléphone est obligatoire')
    .matches(/^\+?[0-9\s-]{8,15}$/, 'Numéro de téléphone non valide'),
  age: yup
    .number()
    .typeError('L\'âge doit être un nombre')
    .required('L\'âge est obligatoire')
    .positive('L\'âge doit être supérieur à 0')
    .integer('L\'âge doit être un nombre entier'),
});