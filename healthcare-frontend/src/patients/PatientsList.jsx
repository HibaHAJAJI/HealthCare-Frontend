import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { Card } from "../components/card/Card";
import { Table } from "../components/table/Table";
import patientService from "../services/patientService";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadPatients = async () => {
      try {
        const response = await patientService.getAll();
        if (isMounted) {
          setPatients(response.content || response || []);
          setError("");
        }
      } catch (err) {
        console.error(err);
        const msg = !err.response
          ? "Erreur réseau. Vérifiez votre connexion."
          : "Impossible de charger les patients.";
        if (isMounted) {
          setError(msg);
          toast.error(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPatients();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce patient ?")) return;

    try {
      await patientService.delete(id);
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
      toast.success("Patient supprimé avec succès.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression.");
    }
  };

  const filteredPatients = patients
    .filter((patient) => {
      const search = searchTerm.toLowerCase();
      const target = `${patient.username || ""} ${patient.email || ""}`.toLowerCase();
      return target.includes(search);
    })
    .sort((a, b) => {
      const nameA = (a.username || "").toLowerCase();
      const nameB = (b.username || "").toLowerCase();

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  if (loading) {
    return (
      <div className="loader-container">
        <FaSpinner className="spinner" size={32} />
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="patients-list-page">
      <div className="page-header">
        <div>
          <h1>Patients</h1>
          <p>Liste des patients enregistrés.</p>
        </div>

        <Link to="/patients/add" className="btn-primary">
          <FaPlus size={18} />
          Nouveau Patient
        </Link>
      </div>

      <Card>
        <div className="table-actions">
          <div className="search-container">
            <FaSearch className="search-icon-inside" />
            <input
              type="text"
              placeholder="Rechercher un patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Trier : A → Z</option>
            <option value="desc">Trier : Z → A</option>
          </select>
        </div>

        {patients.length === 0 ? (
          <div className="empty-state">Aucun patient enregistré.</div>
        ) : (
          <Table
            headers={[
              "ID",
              "Nom d'utilisateur",
              "Email",
              "Téléphone",
              "Date de naissance",
              "Actions",
            ]}
          >
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Aucun patient trouvé.
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.username}</td>
                  <td>{patient.email}</td>
                  <td>{patient.telephone}</td>
                  <td>{patient.dateNaissance}</td>
                  <td>
                    <div className="action-buttons-group">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="action-btn view"
                        title="Voir détails"
                      >
                        <FaEye />
                      </Link>

                      <Link
                        to={`/patients/edit/${patient.id}`}
                        className="action-btn edit"
                        title="Modifier"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(patient.id)}
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </Table>
        )}
      </Card>
    </div>
  );
};

export default PatientsList;