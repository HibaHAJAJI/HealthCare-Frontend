import { useEffect, useState } from "react";
import axios from "../../services/axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalMedecins: 0,
    totalRendezVous: 0,
    totalDossiers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCount = async (endpoint) => {
      try {
        const response = await axios.get(`/${endpoint}?page=0&size=1`);
        return response.data.totalElements || 0;
      } catch (err) {
        console.error(`Erreur lors du chargement de ${endpoint}:`, err);
        return 0;
      }
    };

    const fetchDashboardData = async () => {
      try {
        const [
          totalPatients,
          totalMedecins,
          totalRendezVous,
          totalDossiers,
        ] = await Promise.all([
          fetchCount("patients"),
          fetchCount("medecins"),
          fetchCount("rendez-vous"),
          fetchCount("dossier-medicaux"),
        ]);

        setStats({
          totalPatients,
          totalMedecins,
          totalRendezVous,
          totalDossiers,
        });
      } catch (err) {
        console.error("Erreur lors du chargement du dashboard :", err);
        setError("Impossible de charger les statistiques.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Patients</h3>
          <p className="stat-number">{stats.totalPatients}</p>
        </div>

        <div className="stat-card">
          <h3>Médecins</h3>
          <p className="stat-number">{stats.totalMedecins}</p>
        </div>

        <div className="stat-card">
          <h3>Rendez-vous</h3>
          <p className="stat-number">{stats.totalRendezVous}</p>
        </div>

        <div className="stat-card">
          <h3>Dossiers médicaux</h3>
          <p className="stat-number">{stats.totalDossiers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;