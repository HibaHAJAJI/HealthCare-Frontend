import { useNavigate } from "react-router-dom";
import PatientForm from "./PatientForm";
import patientService from "../services/patientService";
import "./Patient.css";

const AddPatient = () => {
  const navigate = useNavigate();

  const handleAddPatient = async (data) => {
    try {
      await patientService.create(data);

      alert("Patient ajouté avec succès !");
      navigate("/patients");
    } catch (error) {
      console.error("Erreur lors de l'ajout du patient :", error);

      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors de l'ajout du patient.";

      alert(message);
    }
  };

  return (
    <div className="form-container">
      <div className="header-section">
        <h2>Ajouter un patient</h2>

        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/patients")}
        >
          Retour
        </button>
      </div>

      <PatientForm
        onSubmit={handleAddPatient}
        submitLabel="Ajouter le patient"
      />
    </div>
  );
};

export default AddPatient;