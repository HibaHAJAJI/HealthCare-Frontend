import MedecinsList from "../../medecins/MedecinsList";
import "./Medecins.css";

const Medecins = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Médecins</h1>
        <p>Consultez et gérez la liste des médecins.</p>
      </div>

      <MedecinsList />
    </div>
  );
};

export default Medecins;