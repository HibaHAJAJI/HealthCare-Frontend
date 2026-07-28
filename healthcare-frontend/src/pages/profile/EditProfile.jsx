import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import "./Profile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    specialite: "",
  });

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getCurrentUser();

        setRole(data.role);

        setFormData({
          username: data.username || "",
          email: data.email || "",
          telephone: data.telephone || "",
          dateNaissance: data.dateNaissance || "",
          specialite: data.specialite || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await userService.updateCurrentUser(formData);

      alert("Profil modifié avec succès.");

      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h3>Chargement...</h3>;
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">

        <h2>Modifier mon profil</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {(role === "PATIENT" || role === "MEDECIN") && (
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>
          )}

          {role === "PATIENT" && (
            <div className="form-group">
              <label>Date de naissance</label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
              />
            </div>
          )}

          {role === "MEDECIN" && (
            <div className="form-group">
              <label>Spécialité</label>
              <input
                type="text"
                name="specialite"
                value={formData.specialite}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="button-group">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/profile")}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="btn-save"
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default EditProfile;