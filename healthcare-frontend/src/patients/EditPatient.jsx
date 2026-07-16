import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import PatientForm from "./PatientForm";
import patientService from "../services/patientService";
import "./Patient.css";

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await patientService.getById(id);
        setPatient(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du patient :", error);
        alert(
          error.response?.data?.message ||
            "Impossible de charger les informations du patient."
        );
        navigate("/patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id, navigate]);

  const handleEditPatient = async (updatedData) => {
    try {
      await patientService.update(id, updatedData);

      alert("Patient mis à jour avec succès !");
      navigate("/patients");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);

      alert(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la mise à jour."
      );
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
        <h2>Modifier le patient</h2>

        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/patients")}
        >
          Retour
        </button>
      </div>

      <PatientForm
        initialData={patient}
        onSubmit={handleEditPatient}
        submitLabel="Mettre à jour"
      />
    </div>
  );
};

export default EditPatient;