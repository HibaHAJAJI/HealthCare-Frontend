import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Eye, Edit2, Trash2, Loader } from 'lucide-react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import medecinService from '../services/medecinService';
import './Medecin.css';

const MedecinsList = () => {
  const [medecins, setMedecins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMedecins() {
      try {
        const data = await medecinService.getAll();
        setMedecins(data);
      } catch (err) {
        console.error("Erreur lors du chargement des médecins :", err);
        setError("Impossible de charger la liste des médecins.");
      } finally {
        setLoading(false);
      }
    }
    loadMedecins();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous supprimer ce médecin ?");
    if (!confirmDelete) return;

    try {
      await medecinService.delete(id);
      setMedecins((prev) => prev.filter((m) => m.id !== id));
      alert("Médecin supprimé avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Erreur lors de la suppression du médecin.");
    }
  };

  const filteredMedecins = medecins.filter((m) => {
    const fullName = `${m.nom || ''} ${m.prenom || ''}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      m.speciality?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="medecins-list-page">
      <div className="page-header">
        <div>
          <h1>Médecins</h1>
          <p>Gestion de l'équipe médicale.</p>
        </div>
        <Link to="/doctors/add" className="btn-primary">
          <Plus size={18} />
          <span>Nouveau Médecin</span>
        </Link>
      </div>

      <Card>
        <div className="table-actions">
          <div className="search-container">
            <Search size={18} className="search-icon-inside" />
            <input 
              type="text" 
              placeholder="Rechercher par nom ou spécialité..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <div className="error-container">{error}</div>
        ) : loading ? (
          <div className="loader-container">
            <Loader className="spinner" size={32} />
          </div>
        ) : (
          <Table headers={['ID', 'Nom', 'Prénom', 'Spécialité', 'Email', 'Actions']}>
            {filteredMedecins.length > 0 ? (
              filteredMedecins.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td><strong>{m.nom}</strong></td>
                  <td>{m.prenom}</td>
                  <td>{m.speciality}</td>
                  <td>{m.email}</td>
                  <td>
                    <div className="action-buttons-group">
                      <Link to={`/doctors/${m.id}`} className="action-btn view" title="Détails">
                        <Eye size={18} />
                      </Link>
                      <Link to={`/doctors/edit/${m.id}`} className="action-btn edit" title="Modifier">
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        type="button" 
                        className="action-btn delete" 
                        onClick={() => handleDelete(m.id)}
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data">Aucun médecin trouvé.</td>
              </tr>
            )}
          </Table>
        )}
      </Card>
    </div>
  );
};

export default MedecinsList;