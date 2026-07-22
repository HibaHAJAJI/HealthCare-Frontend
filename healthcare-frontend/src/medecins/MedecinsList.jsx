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

import { Card } from "../components/card/Card";
import { Table } from "../components/table/Table";
import medecinService from "../services/medecinService";

import "./Medecin.css";

const MedecinsList = () => {
  const [medecins, setMedecins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMedecins = async () => {
      try {
        const response = await medecinService.getAll();

        setMedecins(response.content);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger la liste des médecins.");
      } finally {
        setLoading(false);
      }
    };

    loadMedecins();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer ce médecin ?")) return;

    try {
      await medecinService.delete(id);

      setMedecins((prev) =>
        prev.filter((medecin) => medecin.id !== id)
      );

      alert("Médecin supprimé avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const filteredMedecins = medecins.filter((medecin) =>
    (medecin.username ?? "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (medecin.email ?? "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loader-container">
        <FaSpinner className="spinner" size={32} />
      </div>
    );
  }

  return (
    <div className="medecins-list-page">
      <div className="page-header">
        <div>
          <h1>Médecins</h1>
          <p>Liste des médecins enregistrés.</p>
        </div>

        <Link to="/medecins/add" className="btn-primary">
          <FaPlus size={18} />
          Nouveau Médecin
        </Link>
      </div>

      <Card>
        <div className="table-actions">
          <div className="search-container">
            <FaSearch className="search-icon-inside" />

            <input
              type="text"
              placeholder="Rechercher..."
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
              "Nom d'utilisateur",
              "Email",
              "Téléphone",
              "Spécialité",
              "Actions",
            ]}
          >
            {filteredMedecins.length === 0 ? (
              <tr>
                <td colSpan={6}>Aucun médecin trouvé.</td>
              </tr>
            ) : (
              filteredMedecins.map((medecin) => (
                <tr key={medecin.id}>
                  <td>{medecin.id}</td>
                  <td>{medecin.username}</td>
                  <td>{medecin.email}</td>
                  <td>{medecin.telephone}</td>
                  <td>{medecin.speciality}</td>

                  <td>
                    <div className="action-buttons-group">
                      <Link
                        to={`/medecins/${medecin.id}`}
                        className="action-btn view"
                      >
                        <FaEye />
                      </Link>

                      <Link
                        to={`/medecins/edit/${medecin.id}`}
                        className="action-btn edit"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(medecin.id)}
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

export default MedecinsList;