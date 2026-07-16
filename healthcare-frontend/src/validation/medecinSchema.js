import * as yup from 'yup';

export const medecinSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Le nom du médecin est obligatoire')
    .min(3, 'Le nom doit contenir au moins 3 caractères'),
  speciality: yup
    .string()
    .required('La spécialité est obligatoire'),
  email: yup
    .string()
    .email('Format d\'email invalide')
    .required('L\'adresse email est obligatoire'),
  phone: yup
    .string()
    .required('Le téléphone est obligatoire'),
});