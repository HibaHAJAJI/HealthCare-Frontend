import * as yup from 'yup';

export const dossierSchema = yup.object().shape({
  patientId: yup
    .string()
    .required('Veuillez associer un patient'),
  diagnosis: yup
    .string()
    .required('Le diagnostic est obligatoire')
    .min(5, 'Veuillez détailler le diagnostic'),
  treatment: yup
    .string()
    .required('Le traitement est obligatoire'),
  notes: yup
    .string()
    .max(500, 'Les notes ne doivent pas dépasser 500 caractères'),
});