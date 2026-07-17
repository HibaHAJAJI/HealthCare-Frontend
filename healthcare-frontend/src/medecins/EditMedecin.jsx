import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MedecinForm from './MedecinForm';
import medecinService from '../services/medecinService';
import { Loader } from 'lucide-react';

const EditMedecin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medecin, setMedecin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedecinData() {
      try {
        const data = await medecinService.getById(id);
        setMedecin(data);
      } catch (error) {
        console.error("Erreur de récupération du médecin :", error);
        alert("Impossible de charger les données de ce médecin.");
        navigate('/doctors');
      } finally {
        setLoading(false);
      }
    }
    fetchMedecinData();
  }, [id, navigate]);

  const handleEditMedecin = async (updatedData) => {
    try {
      await medecinService.update(id, updatedData);
      alert("Médecin mis à jour avec succès !");
      navigate('/doctors');
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      alert("Erreur lors de la mise à jour sur le serveur.");
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader className="spinner" size={32} />
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="header-section">
        <h2>Modifier le Médecin #{id}</h2>
        <button type="button" className="btn-back" onClick={() => navigate('/doctors')}>Retour</button>
      </div>
      <MedecinForm 
        onSubmit={handleEditMedecin} 
        initialData={medecin} 
        submitLabel="Mettre à jour" 
      />
    </div>
  );
};

export default EditMedecin;