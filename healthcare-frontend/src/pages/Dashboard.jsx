import { Card } from "../components/card/Card";
import "./Dashboard.css";

const Dashboard = () => {
  const stats = {
    totalPatients: 0,
    totalMedecins: 0,
    totalRendezVous: 0,
    totalDossiers: 0,
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Tableau de bord</h1>
        <p>Aperçu général de l'activité de la clinique.</p>
      </div>

      <div className="stats-grid">
        <Card>
          <div className="stat-box">
            <h4>Total Patients</h4>
            <span className="stat-number">{stats.totalPatients}</span>
          </div>
        </Card>

        <Card>
          <div className="stat-box">
            <h4>Total Médecins</h4>
            <span className="stat-number">{stats.totalMedecins}</span>
          </div>
        </Card>

        <Card>
          <div className="stat-box">
            <h4>Total Rendez-vous</h4>
            <span className="stat-number">{stats.totalRendezVous}</span>
          </div>
        </Card>

        <Card>
          <div className="stat-box">
            <h4>Dossiers médicaux</h4>
            <span className="stat-number">{stats.totalDossiers}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;