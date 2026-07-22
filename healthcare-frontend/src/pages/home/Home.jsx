import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaShieldAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

import { Card } from "../../components/card/Card";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">
          Bienvenue sur <span>HealthCare+</span>
        </h1>

        <p className="hero-subtitle">
          Une plateforme moderne de gestion médicale permettant de gérer les
          patients, les médecins, les rendez-vous et les dossiers médicaux
          depuis une interface simple et intuitive.
        </p>

        <div className="hero-actions">
          <Link to="/dashboard" className="btn-primary">
            Accéder au tableau de bord
            <FaArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="features-grid">
        <Card>
          <div className="feature-icon icon-primary">
            <FaUsers size={24} />
          </div>

          <h3 className="feature-title">
            Gestion des patients
          </h3>

          <p className="feature-text">
            Ajouter, modifier, consulter et supprimer les informations des
            patients.
          </p>
        </Card>

        <Card>
          <div className="feature-icon icon-accent">
            <FaHeartbeat size={24} />
          </div>

          <h3 className="feature-title">
            Gestion des rendez-vous
          </h3>

          <p className="feature-text">
            Planifier et suivre facilement les rendez-vous entre médecins et
            patients.
          </p>
        </Card>

        <Card>
          <div className="feature-icon icon-success">
            <FaShieldAlt size={24} />
          </div>

          <h3 className="feature-title">
            Dossiers médicaux
          </h3>

          <p className="feature-text">
            Centraliser les dossiers médicaux pour un suivi rapide et sécurisé.
          </p>
        </Card>
      </section>
    </div>
  );
};

export default Home;