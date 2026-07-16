import { Link } from 'react-router-dom';
import { Activity, Shield, Users, ArrowRight } from 'lucide-react';
import { Card } from '../components/Card';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Une gestion clinique simplifiée avec <span>HealthCare+</span></h1>
        <p className="hero-subtitle">
          Pilotez votre établissement de santé, suivez vos patients et planifiez vos rendez-vous en quelques clics sur une seule et même plateforme.
        </p>
        <div className="hero-actions">
          <Link to="/dashboard" className="btn-primary">
            Accéder au Dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="features-grid">
        <Card>
          <div className="feature-icon icon-primary"><Users size={24} /></div>
          <h4 className="feature-title">Gestion des Patients</h4>
          <p className="feature-text">Suivi médical complet, fiches de contact et historiques de traitement sécurisés.</p>
        </Card>
        <Card>
          <div className="feature-icon icon-accent"><Activity size={24} /></div>
          <h4 className="feature-title">Suivi des Consultations</h4>
          <p className="feature-text">Prenez des rendez-vous et gérez le planning de vos médecins en temps réel.</p>
        </Card>
        <Card>
          <div className="feature-icon icon-success"><Shield size={24} /></div>
          <h4 className="feature-title">Dossiers Sécurisés</h4>
          <p className="feature-text">Respect de la confidentialité et du secret médical grâce à un cryptage de haut niveau.</p>
        </Card>
      </section>
    </div>
  );
};

export default Home;