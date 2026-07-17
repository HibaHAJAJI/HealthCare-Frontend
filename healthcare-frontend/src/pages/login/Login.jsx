import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaSpinner } from "react-icons/fa";
import authService from "../../services/authService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await authService.login(username, password);
      navigate("/dashboard");
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
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>HealthCare+</h2>
          <p>Connectez-vous à votre espace de gestion</p>
        </div>

        {error && (
          <div className="error-container">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <div className="input-icon-wrapper">
              <FaUser className="input-icon" size={18} />
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
              <FaLock className="input-icon" size={18} />
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

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="spinner" size={20} />
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;