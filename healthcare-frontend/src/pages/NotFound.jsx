import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h2>404 - Page Introuvable</h2>
      <p>La page que vous recherchez n'existe pas.</p>
      <button type="button" className="btn-back" onClick={() => navigate('/')}>
        Retour à l'accueil
      </button>
    </div>
  );
};

export default NotFound;