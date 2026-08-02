import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";

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
    const loadPatients = async () => {
      try {
        const response = await patientService.getAll();
        setPatients(response.content || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger la liste des patients.");
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce patient ?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await patientService.delete(id);

      setPatients((prev) =>
        prev.filter((patient) => patient.id !== id)
      );

      toast.success("Patient supprimé avec succès !");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression.");
    }
  };

  const filteredPatients = patients
    .filter((patient) =>
      (patient.username || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = (a.username || "").toLowerCase();
      const nameB = (b.username || "").toLowerCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      }

      return nameB.localeCompare(nameA);
    });

  if (loading) {
    return (
      <div className="loader-container">
        <FaSpinner className="spinner" size={32} />
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
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="sort-container">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Nom (A → Z)</option>
              <option value="desc">Nom (Z → A)</option>
            </select>
          </div>

        </div>

        {error ? (
          <div className="error-container">
            {error}
          </div>
        ) : patients.length === 0 ? (
          <div className="empty-container">
            Aucun patient disponible.
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="empty-container">
            Aucun patient trouvé.
          </div>
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
            {filteredPatients.map((patient, index) => (
              <tr
                key={
                  patient.id ||
                  `${patient.telephone}-${patient.dateNaissance}-${index}`
                }
              >
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
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/patients/edit/${patient.id}`}
                      className="action-btn edit"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      type="button"
                      className="action-btn delete"
                      onClick={() => handleDelete(patient.id)}
                    >
                      <FaTrash />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}

      </Card>

    </div>
  );
};

export default PatientsList;

