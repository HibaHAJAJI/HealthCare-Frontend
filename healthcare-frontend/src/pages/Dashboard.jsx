import { Card } from '../components/Card';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Tableau de bord</h1>
        <p>Aperçu général de l'activité.</p>
      </div>

      <div className="stats-grid">
        <Card>
          <div className="stat-box">
            <h4>Total Patients</h4>
            <span className="stat-number">--</span>
          </div>
        </Card>

        <Card>
          <div className="stat-box">
            <h4>Médecins Actifs</h4>
            <span className="stat-number">--</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;