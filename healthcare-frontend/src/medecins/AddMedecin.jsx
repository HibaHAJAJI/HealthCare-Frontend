import { useNavigate } from 'react-router-dom';
import MedecinForm from './MedecinForm';
import medecinService from '../services/medecinService';
import './Medecin.css';

const AddMedecin = () => {
  const navigate = useNavigate();

  const handleAddMedecin = async (data) => {
    try {
      await medecinService.create(data);
      alert("Médecin ajouté avec succès !");
      navigate('/doctors');
    } catch (error) {
      console.error("Erreur lors de la création du médecin :", error);
      alert("Une erreur est survenue lors de l'enregistrement du médecin.");
    }
  };

  return (
    <div className="form-container">
      <div className="header-section">
        <h2>Ajouter un Médecin</h2>
        <button type="button" className="btn-back" onClick={() => navigate('/doctors')}>Retour</button>
      </div>
      <MedecinForm onSubmit={handleAddMedecin} submitLabel="Ajouter le Médecin" />
    </div>
  );
};

export default AddMedecin;