import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patientSchema } from "../validation/patientSchema";
import "./Patient.css";

const PatientForm = ({
  onSubmit,
  initialData,
  submitLabel = "Enregistrer",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="patient-form">
      <div className="form-group">
        <label>Nom</label>
        <input
          type="text"
          placeholder="Entrez le nom"
          className={errors.nom ? "error" : ""}
          {...register("nom")}
        />
        {errors.nom && (
          <p className="error-text">{errors.nom.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Prénom</label>
        <input
          type="text"
          placeholder="Entrez le prénom"
          className={errors.prenom ? "error" : ""}
          {...register("prenom")}
        />
        {errors.prenom && (
          <p className="error-text">{errors.prenom.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="exemple@email.com"
          className={errors.email ? "error" : ""}
          {...register("email")}
        />
        {errors.email && (
          <p className="error-text">{errors.email.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Téléphone</label>
        <input
          type="text"
          placeholder="+212 6XXXXXXXX"
          className={errors.telephone ? "error" : ""}
          {...register("telephone")}
        />
        {errors.telephone && (
          <p className="error-text">{errors.telephone.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Date de naissance</label>
        <input
          type="date"
          className={errors.dateNaissance ? "error" : ""}
          {...register("dateNaissance")}
        />
        {errors.dateNaissance && (
          <p className="error-text">{errors.dateNaissance.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Adresse</label>
        <textarea
          rows="3"
          placeholder="Entrez l'adresse"
          className={errors.adresse ? "error" : ""}
          {...register("adresse")}
        />
        {errors.adresse && (
          <p className="error-text">{errors.adresse.message}</p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;