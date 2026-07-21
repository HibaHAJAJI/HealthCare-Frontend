import PatientsList from "../../patients/PatientsList";
import "./patients.css";


const Patients = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Patients</h1>
        <p>Consultez et gérez la liste des patients.</p>
      </div>

      <PatientsList />
    </div>
  );
};

export default Patients;