import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema } from '../validation/patientSchema';
import './Patient.css';

const PatientForm = ({ onSubmit, initialData, submitLabel = "Enregistrer" }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(patientSchema)
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="patient-form">
      <div className="form-group">
        <label>Nom Complet</label>
        <input 
          type="text" 
          placeholder="Ex: Anas Bennani" 
          className={errors.fullName ? 'error' : ''}
          {...register('fullName')} 
        />
        {errors.fullName && <p className="error-text">{errors.fullName.message}</p>}
      </div>

      <div className="form-group">
        <label>Adresse Email</label>
        <input 
          type="email" 
          placeholder="Ex: a.bennani@email.com" 
          className={errors.email ? 'error' : ''}
          {...register('email')} 
        />
        {errors.fullName && <p className="error-text">{errors.email?.message}</p>}
      </div>

      <div className="form-group">
        <label>Téléphone</label>
        <input 
          type="text" 
          placeholder="Ex: +212 65432109" 
          className={errors.phone ? 'error' : ''}
          {...register('phone')} 
        />
        {errors.phone && <p className="error-text">{errors.phone.message}</p>}
      </div>

      <div className="form-group">
        <label>Âge</label>
        <input 
          type="number" 
          placeholder="Ex: 28" 
          className={errors.age ? 'error' : ''}
          {...register('age')} 
        />
        {errors.age && <p className="error-text">{errors.age.message}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">{submitLabel}</button>
      </div>
    </form>
  );
};

export default PatientForm;