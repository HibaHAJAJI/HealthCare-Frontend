import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader } from 'lucide-react';
import authService from '../../services/authService'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(email, password);
      
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Email ou mot de passe incorrect.';
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
          <div className="error-container" style={{ marginBottom: '16px', padding: '12px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <Loader className="spinner" size={20} /> : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;