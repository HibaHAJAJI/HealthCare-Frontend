import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Loader,
  ArrowLeft,
  Edit2,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { Card } from "../components/Card";
import patientService from "../services/patientService";
import "./Patient.css";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPatientDetails() {
      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (err) {
        console.error("Erreur lors de la récupération du patient :", err);
        setError("Impossible de charger les détails de ce patient.");
      } finally {
        setLoading(false);
      }
    }

    fetchPatientDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader className="spinner" size={32} />
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="error-container">
        <p className="error-text">
          {error || "Patient introuvable."}
        </p>

        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/patients")}
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="patient-details-page">
      <div className="page-header">
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/patients")}
        >
          <ArrowLeft size={16} />
          <span>Retour</span>
        </button>

        <Link
          to={`/patients/edit/${patient.id}`}
          className="btn-primary"
        >
          <Edit2 size={16} />
          <span>Modifier la fiche</span>
        </Link>
      </div>

      <Card>
        <div className="patient-profile-header">
          <div className="profile-avatar-large">
            {patient.nom?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-title-container">
            <h2>
              {patient.nom} {patient.prenom}
            </h2>
            <span className="badge badge-success">
              Dossier actif
            </span>
          </div>
        </div>

        <div className="patient-info-grid">
          <div className="info-block">
            <div className="block-header">
              <User size={18} />
              <h3>Informations personnelles</h3>
            </div>

            <div className="block-body">
              <p>
                <strong>Identifiant :</strong> #{patient.id}
              </p>

              <p>
                <strong>Nom :</strong> {patient.nom}
              </p>

              <p>
                <strong>Prénom :</strong> {patient.prenom}
              </p>

              <p>
                <strong>Âge :</strong>{" "}
                {patient.age ? `${patient.age} ans` : "Non renseigné"}
              </p>
            </div>
          </div>

          <div className="info-block">
            <div className="block-header">
              <Phone size={18} />
              <h3>Coordonnées</h3>
            </div>

            <div className="block-body">
              <p className="info-item-flex">
                <Mail size={16} />
                <span>{patient.email || "Non renseigné"}</span>
              </p>

              <p className="info-item-flex">
                <Phone size={16} />
                <span>{patient.telephone || "Non renseigné"}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientDetails;