import { useEffect, useState } from "react";
import axios from "../../services/axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`/patients/${user.id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!userData) {
    return <p>Chargement...</p>;
  }

  return (
   <div className="profile-container">
  <h2>Mon Profil</h2>

  <div className="profile-card">
    <div className="profile-item">
      <span className="profile-label">Nom</span>
      <span className="profile-value">{userData.nom}</span>
    </div>

    <div className="profile-item">
      <span className="profile-label">Prénom</span>
      <span className="profile-value">{userData.prenom}</span>
    </div>

    <div className="profile-item">
      <span className="profile-label">Email</span>
      <span className="profile-value">{userData.email}</span>
    </div>

    <div className="profile-item">
      <span className="profile-label">Téléphone</span>
      <span className="profile-value">{userData.telephone}</span>
    </div>
  </div>
</div>
  );
};

export default Profile;