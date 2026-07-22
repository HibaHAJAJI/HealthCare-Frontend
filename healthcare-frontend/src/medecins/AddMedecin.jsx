import { useNavigate } from "react-router-dom";
import MedecinForm from "./MedecinForm";
import medecinService from "../services/medecinService";
import "./Medecin.css";

const AddMedecin = () => {
  const navigate = useNavigate();

  const handleAddMedecin = async (data) => {
    try {
      await medecinService.create(data);

      alert("Médecin ajouté avec succès !");
      navigate("/medecins");
    } catch (error) {
      console.error("Erreur lors de l'ajout du médecin :", error);

      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors de l'ajout du médecin.";

      alert(message);
    }
  };

  return (
    <div className="form-container">
      <div className="header-section">
        <h2>Ajouter un médecin</h2>

        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/medecins")}
        >
          Retour
        </button>
      </div>

      <MedecinForm
        onSubmit={handleAddMedecin}
        submitLabel="Ajouter le médecin"
      />
    </div>
  );
};

export default AddMedecin;