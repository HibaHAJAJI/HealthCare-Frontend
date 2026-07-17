import { useNavigate } from 'react-router-dom';
import DoctorForm from './MedecinForm';
import doctorService from '../services/medecinService';

const AddDoctor = () => {
  const navigate = useNavigate();

  const handleAddDoctor = async (data) => {
    try {
      await doctorService.create(data);
      alert("Médecin ajouté avec succès !");
      navigate('/doctors');
    } catch (error) {
      console.error("Erreur lors de la création du médecin :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="form-container">
      <div className="header-section">
        <h2>Ajouter un Médecin</h2>
        <button className="btn-back" onClick={() => navigate('/doctors')}>Retour</button>
      </div>
      <DoctorForm onSubmit={handleAddDoctor} submitLabel="Ajouter le Médecin" />
    </div>
  );
};

export default AddDoctor;