import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaArrowLeft,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaAward,
} from "react-icons/fa";

import { Card } from "../components/card/Card";
import doctorService from "../services/medecinService";
import "./Medecin.css";

const MedecinDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medecin, setMedecin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedecinDetails = async () => {
      try {
        const data = await doctorService.getById(id);
        setMedecin(data);
      } catch (err) {
        console.error("Erreur lors de la récupération du médecin :", err);
        setError("Impossible de charger les détails de ce médecin.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedecinDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <FaSpinner className="spinner" size={32} />
      </div>
    );
  }

  if (error || !medecin) {
    return (
      <div className="error-container">
        <p className="error-text">
          {error || "Médecin introuvable."}
        </p>

        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/medecins")}
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="doctor-details-page">
      <div className="page-header">
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/medecins")}
        >
          <FaArrowLeft size={16} />
          <span>Retour</span>
        </button>

        <Link
          to={`/medecins/edit/${medecin.id}`}
          className="btn-primary"
        >
          <FaEdit size={16} />
          <span>Modifier la fiche</span>
        </Link>
      </div>

      <Card>
        <div className="doctor-profile-header">
          <div className="profile-avatar-large">
            {medecin.username?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-title-container">
            <h2>Dr. {medecin.username}</h2>

            <span className="badge badge-success">
              {medecin.specialite || "Spécialité non renseignée"}
            </span>
          </div>
        </div>

        <div className="doctor-info-grid">
          <div className="info-block">
            <div className="block-header">
              <FaAward size={18} />
              <h3>Informations professionnelles</h3>
            </div>

            <div className="block-body">
              <p>
                <strong>Identifiant :</strong> #{medecin.id}
              </p>

              <p>
                <strong>Nom d'utilisateur :</strong> {medecin.username}
              </p>

              <p>
                <strong>Spécialité :</strong>{" "}
                {medecin.specialite || "Non renseignée"}
              </p>
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
                <span>{medecin.email || "Non renseigné"}</span>
              </p>

              <p className="info-item-flex">
                <FaPhone size={16} />
                <span>{medecin.telephone || "Non renseigné"}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MedecinDetails;