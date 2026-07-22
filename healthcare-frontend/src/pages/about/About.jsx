import { Card } from "../../components/card/Card";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>À propos</h1>
        <p>Découvrez l'application HealthCare+.</p>
      </div>

      <Card title="HealthCare+">
        <p>
          HealthCare+ est une application web de gestion médicale permettant
          d'administrer efficacement les patients, les médecins, les
          rendez-vous et les dossiers médicaux.
        </p>

        <br />

        <h3>Fonctionnalités principales</h3>

        <ul>
          <li>Gestion des patients</li>
          <li>Gestion des médecins</li>
          <li>Gestion des rendez-vous</li>
          <li>Gestion des dossiers médicaux</li>
          <li>Tableau de bord avec statistiques</li>
        </ul>
      </Card>
    </div>
  );
};

export default About;