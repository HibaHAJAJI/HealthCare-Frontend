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
import patientService from "../services/patientService";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("error");


  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await patientService.getAll();

        setPatients(response.content);

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
    if (!window.confirm("Voulez-vous supprimer ce patient ?")) return;

    try {
      await patientService.delete(id);

      setPatients((prev) =>
        prev.filter((patient) => patient.id !== id)
      );

      alert("Patient supprimé avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };


  const filteredPatients = patients.filter((patient) =>
    (patient.username ?? "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (patient.email ?? "")
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

            <FaSearch className="search-icon-inside"  />

            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>
        </div>


        {error ? (
          <div className="error-container">
            {error}
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

            {filteredPatients.length === 0 ? (

              <tr>
                <td colSpan={6}>
                  Aucun patient trouvé.
                </td>
              </tr>

            ) : (

              filteredPatients.map((patient, index) => (

                <tr
                  key={patient.id ?? `${patient.telephone}-${patient.dateNaissance}-${index}`}
                >

                  <td>{patient.id}</td>

                  <td>
                    {patient.username}
                  </td>

                  <td>
                    {patient.email}
                  </td>

                  <td>
                    {patient.telephone}
                  </td>

                  <td>
                    {patient.dateNaissance}
                  </td>


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
                        className="action-btn delete"
                        onClick={() => handleDelete(patient.id)}
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