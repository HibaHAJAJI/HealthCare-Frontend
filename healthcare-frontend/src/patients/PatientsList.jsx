import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Loader,
} from "lucide-react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import patientService from "../services/patientService";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await patientService.getAll();
        setPatients(data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setError("Impossible de charger la liste des patients.");
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer ce patient ?"
    );

    if (!confirmDelete) return;

    try {
      await patientService.delete(id);

      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id)
      );

      alert("Patient supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression du patient.");
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.nom || ''} ${patient.prenom || ''}`.toLowerCase();

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="loader-container">
        <Loader className="spinner" size={32} />
      </div>
    );
  }

  return (
    <div className="patients-list-page">
      <div className="page-header">
        <div>
          <h1>Patients</h1>
          <p>Liste des patients enregistrés.</p>
        </div>

        <Link to="/patients/add" className="btn-primary">
          <Plus size={18} />
          <span>Nouveau Patient</span>
        </Link>
      </div>

      <Card>
        <div className="table-actions">
          <div className="search-container">
            <Search size={18} className="search-icon-inside" />

            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <div className="error-container">{error}</div>
        ) : (
          <Table
            headers={[
              "ID",
              "Nom",
              "Prénom",
              "Email",
              "Téléphone",
              "Actions",
            ]}
          >
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.nom}</td>
                  <td>{patient.prenom}</td>
                  <td>{patient.email}</td>
                  <td>{patient.telephone}</td>

                  <td>
                    <div className="action-buttons-group">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="action-btn view"
                        title="Voir les détails"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        to={`/patients/edit/${patient.id}`}
                        className="action-btn edit"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </Link>

                      <button
                        type="button"
                        className="action-btn delete"
                        title="Supprimer"
                        onClick={() => handleDelete(patient.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data">
                  Aucun patient trouvé.
                </td>
              </tr>
            )}
          </Table>
        )}
      </Card>
    </div>
  );
};

export default PatientsList;