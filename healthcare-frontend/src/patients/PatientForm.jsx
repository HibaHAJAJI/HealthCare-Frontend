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
  
const isEdit = !!initialData;

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: yupResolver(patientSchema(isEdit)),
});

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="patient-form">
      <div className="form-group">
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          placeholder="Ex : karima_patient"
          className={errors.username ? "error" : ""}
          {...register("username")}
        />
        {errors.username && (
          <p className="error-text">{errors.username.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Adresse Email</label>
        <input
          type="email"
          placeholder="Ex : karima@gmail.com"
          className={errors.email ? "error" : ""}
          {...register("email")}
        />
        {errors.email && (
          <p className="error-text">{errors.email.message}</p>
        )}
      </div>

      {!initialData && (
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="********"
            className={errors.password ? "error" : ""}
            {...register("password")}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
      )}

      <div className="form-group">
        <label>Téléphone</label>
        <input
          type="text"
          placeholder="Ex : 0612243344"
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

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;