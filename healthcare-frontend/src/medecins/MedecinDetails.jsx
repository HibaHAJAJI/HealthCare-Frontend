import  { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader, ArrowLeft, Edit2, Phone, Mail, Award } from 'lucide-react';
import { Card } from '../components/Card';
import doctorService from '../services/medecinService';
import './Medecin.css';

const MedecinDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medecin, setMedecin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDoctorDetails() {
      try {
        const data = await doctorService.getById(id);
        setMedecin(data);
      } catch (err) {
        console.error("Erreur de récupération du médecin :", err);
        setError("Impossible de charger les détails de ce médecin.");
      } finally {
        setLoading(false);
      }
    }
    fetchDoctorDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader className="spinner" size={32} />
      </div>
    );
  }

  if (error || !medecin) {
    return (
      <div className="error-container">
        <p className="error-text">{error || "Médecin introuvable."}</p>
        <button type="button" className="btn-back" onClick={() => navigate('/doctors')}>
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="doctor-details-page">
      <div className="page-header">
        <button type="button" className="btn-back" onClick={() => navigate('/doctors')}>
          <ArrowLeft size={16} />
          <span>Retour</span>
        </button>
        <Link to={`/doctors/edit/${medecin.id}`} className="btn-primary">
          <Edit2 size={16} />
          <span>Modifier la fiche</span>
        </Link>
      </div>

      <Card>
        <div className="doctor-profile-header">
          <div className="profile-avatar-large">
            {medecin.nom?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-title-container">
            <h2>Dr. {medecin.prenom} {medecin.nom}</h2>
            <span className="badge badge-success">{medecin.speciality}</span>
          </div>
        </div>

        <div className="doctor-info-grid">
          <div className="info-block">
            <div className="block-header">
              <Award size={18} />
              <h3>Informations Professionnelles</h3>
            </div>
            <div className="block-body">
              <p><strong>Identifiant :</strong> #{medecin.id}</p>
              <p><strong>Spécialité :</strong> {medecin.speciality}</p>
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
                <span>{medecin.email || "Non renseigné"}</span>
              </p>
              <p className="info-item-flex">
                <Phone size={16} />
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