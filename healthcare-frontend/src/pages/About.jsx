import { Card } from '../components/Card';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>À propos</h1>
        <p>Informations sur l'application.</p>
      </div>
      <Card>
        <h2>HealthCare+ v1.0.0</h2>
        <p>Application de gestion pour les établissements de santé connectée à un backend Spring Boot sécurisé.</p>
      </Card>
    </div>
  );
};

export default About;