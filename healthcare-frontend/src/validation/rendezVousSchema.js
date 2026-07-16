import * as yup from 'yup';

export const rendezVousSchema = yup.object().shape({
  patientId: yup
    .string()
    .required('Veuillez sélectionner un patient'),
  doctorId: yup
    .string()
    .required('Veuillez sélectionner un médecin'),
  date: yup
    .date()
    .typeError('Date invalide')
    .required('La date est obligatoire')
    .min(new Date(), 'Le rendez-vous ne peut pas être dans le passé'),
  status: yup
    .string()
    .oneOf(['CONFIRMED', 'PENDING', 'CANCELLED'], 'Statut invalide')
    .default('PENDING'),
});