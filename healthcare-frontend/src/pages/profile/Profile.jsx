import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaPhone,
  FaCalendarAlt,
  FaStethoscope,
  FaEdit,
} from "react-icons/fa";
import userService from "../../services/userService";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  if (!user) {
    return <div className="profile-loading">Chargement...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-title">
          <h2>Mon Profil</h2>
          <p>Informations de votre compte</p>
        </div>

        <div className="profile-content">
          <div className="profile-row">
            <FaUser className="icon" />
            <div className="info">
              <span className="label">Nom d'utilisateur</span>
              <span className="value">{user.username}</span>
            </div>
          </div>

          <div className="profile-row">
            <FaEnvelope className="icon" />
            <div className="info">
              <span className="label">Email</span>
              <span className="value">{user.email}</span>
            </div>
          </div>

          <div className="profile-row">
            <FaUserShield className="icon" />
            <div className="info">
              <span className="label">Rôle</span>
              <span className="badge">{user.role}</span>
            </div>
          </div>

          {user.nom && (
            <div className="profile-row">
              <FaUser className="icon" />
              <div className="info">
                <span className="label">Nom</span>
                <span className="value">{user.nom}</span>
              </div>
            </div>
          )}

          {user.prenom && (
            <div className="profile-row">
              <FaUser className="icon" />
              <div className="info">
                <span className="label">Prénom</span>
                <span className="value">{user.prenom}</span>
              </div>
            </div>
          )}

          {user.telephone && (
            <div className="profile-row">
              <FaPhone className="icon" />
              <div className="info">
                <span className="label">Téléphone</span>
                <span className="value">{user.telephone}</span>
              </div>
            </div>
          )}

          {user.dateNaissance && (
            <div className="profile-row">
              <FaCalendarAlt className="icon" />
              <div className="info">
                <span className="label">Date de naissance</span>
                <span className="value">{user.dateNaissance}</span>
              </div>
            </div>
          )}

          {user.specialite && (
            <div className="profile-row">
              <FaStethoscope className="icon" />
              <div className="info">
                <span className="label">Spécialité</span>
                <span className="value">{user.specialite}</span>
              </div>
            </div>
          )}
        </div>

        <div className="profile-footer">
          <button className="edit-btn" onClick={handleEdit}>
            <FaEdit />
            <span>Modifier le profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;