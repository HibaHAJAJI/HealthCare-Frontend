import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

import MedecinForm from "./MedecinForm";
import medecinService from "../services/medecinService";

import "./Medecin.css";

const EditMedecin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medecin, setMedecin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedecinData = async () => {
      try {
        const data = await medecinService.getById(id);
        setMedecin(data);
      } catch (error) {
        console.error("Erreur de récupération du médecin :", error);
        alert("Impossible de charger les données de ce médecin.");
        navigate("/medecins");
      } finally {
        setLoading(false);
      }
    };

    fetchMedecinData();
  }, [id, navigate]);


  const handleEditMedecin = async (updatedData) => {
    try {
      await medecinService.update(id, updatedData);

      alert("Médecin mis à jour avec succès !");
      navigate("/medecins");

    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      alert("Erreur lors de la mise à jour sur le serveur.");
    }
  };


  if (loading) {
    return (
      <div className="loader-container">
        <FaSpinner className="spinner" size={32} />
      </div>
    );
  }


  if (!medecin) {
    return (
      <div className="error-container">
        <h3>Médecin introuvable</h3>

        <button
          className="btn-back"
          onClick={() => navigate("/medecins")}
        >
          Retour
        </button>
      </div>
    );
  }


  return (
    <div className="form-container">

      <div className="header-section">

        <h2>
          Modifier le médecin
        </h2>

        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/medecins")}
        >
          Retour
        </button>

      </div>


      <MedecinForm
        initialData={medecin}
        onSubmit={handleEditMedecin}
        submitLabel="Mettre à jour"
      />

    </div>
  );
};

export default EditMedecin;