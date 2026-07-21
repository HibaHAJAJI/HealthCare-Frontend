import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaArrowLeft,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

import { Card } from "../components/card/Card";
import patientService from "../services/patientService";
import "./Patient.css";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (err) {
        console.error("Erreur lors de la récupération du patient :", err);
        setError("Impossible de charger les détails de ce patient.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <FaSpinner className="spinner" size={32} />
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
          <FaArrowLeft size={16} />
          <span>Retour</span>
        </button>

        <Link
          to={`/patients/edit/${patient.id}`}
          className="btn-primary"
        >
          <FaEdit size={16} />
          <span>Modifier la fiche</span>
        </Link>
      </div>

      <Card>
        <div className="patient-profile-header">
          <div className="profile-avatar-large">
            {patient.username?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-title-container">
            <h2>{patient.username}</h2>
            <span className="badge badge-success">
              Dossier actif
            </span>
          </div>
        </div>

        <div className="patient-info-grid">
          <div className="info-block">
            <div className="block-header">
              <FaUser size={18} />
              <h3>Informations personnelles</h3>
            </div>

            <div className="block-body">
              <p><strong>Identifiant :</strong> #{patient.id}</p>
              <p><strong>Nom d'utilisateur :</strong> {patient.username}</p>
              <p><strong>Date de naissance :</strong> {patient.dateNaissance || "Non renseignée"}</p>
              <p><strong>Rôle :</strong> {patient.role}</p>
            </div>
          </div>

          <div className="info-block">
            <div className="block-header">
              <FaPhone size={18} />
              <h3>Coordonnées</h3>
            </div>

            <div className="block-body">
              <p className="info-item-flex">
                <FaEnvelope size={16} />
                <span>{patient.email || "Non renseigné"}</span>
              </p>

              <p className="info-item-flex">
                <FaPhone size={16} />
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