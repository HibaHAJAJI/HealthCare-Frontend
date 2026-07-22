import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import authService from "../../services/authService";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    password: "",
    role: "PATIENT"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.register(formData);
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Erreur lors de la création du compte.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fb-register-container">
      <div className="fb-register-header">
        <h1 className="fb-logo">HealthCare+</h1>
        <p className="fb-subhead">Créer un compte rapidement et facilement.</p>
      </div>

      <div className="fb-card">
        <h2>Créer un compte</h2>
        <p className="fb-subtitle">C'est rapide et facile.</p>
        <hr className="fb-divider" />

        {error && <div className="fb-error">{error}</div>}

        <form onSubmit={handleSubmit} className="fb-form">
          <div className="fb-row">
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="nom"
              placeholder="Nom de famille"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Numéro mobile ou e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Nouveau mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="fb-role-section">
            <label className="fb-label">Rôle</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="PATIENT">Patient</option>
              <option value="MEDECIN">Médecin</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>

          <p className="fb-terms">
            En cliquant sur S'inscrire, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
          </p>

          <button type="submit" className="fb-btn-submit" disabled={loading}>
            {loading ? <FaSpinner className="spinner" size={18} /> : "S'inscrire"}
          </button>
        </form>

        <div className="fb-footer-link">
          <Link to="/login">Vous avez déjà un compte ?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;