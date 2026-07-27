import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaUser, FaSpinner, FaHeartbeat } from "react-icons/fa";
import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(username, password);

      if (response && response.token) {

        const user = {
          id: response.id,
          username: response.username,
          role: response.role
        };

        login(user, response.token);

        navigate("/dashboard");
      }

    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Nom d'utilisateur ou mot de passe incorrect.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="brand-logo">
            <FaHeartbeat className="brand-icon" />
            <span>HealthCare+</span>
          </div>
          <h2>Connexion</h2>
          <p className="login-subtitle">Accédez à votre espace médical</p>
        </div>

        {error && <div className="error-container">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <div className="input-icon-wrapper">
              <FaUser className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="Votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <FaSpinner className="spinner" size={20} /> : "Se connecter"}
          </button>
        </form>

        <div className="login-footer">
          <div className="divider">
            <span>Vous n'avez pas de compte ?</span>
          </div>

          <Link to="/register" className="btn-register-link">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;