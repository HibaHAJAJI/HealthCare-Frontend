import * as yup from "yup";

export const patientSchema = (isEdit = false) =>
  yup.object().shape({
    username: yup
      .string()
      .required("Le nom d'utilisateur est obligatoire")
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),

    email: yup
      .string()
      .email("Format d'email invalide")
      .required("L'adresse email est obligatoire"),

    password: isEdit
      ? yup.string().notRequired()
      : yup
          .string()
          .required("Le mot de passe est obligatoire")
          .min(6, "Le mot de passe doit contenir au moins 6 caractères"),

    telephone: yup
      .string()
      .required("Le numéro de téléphone est obligatoire")
      .matches(/^[0-9]+$/, "Le téléphone doit contenir uniquement des chiffres")
      .min(4, "Le téléphone doit contenir au moins 4 chiffres")
      .max(16, "Le téléphone ne doit pas dépasser 16 chiffres"),

    dateNaissance: yup
      .date()
      .typeError("La date de naissance est invalide")
      .required("La date de naissance est obligatoire"),
  });