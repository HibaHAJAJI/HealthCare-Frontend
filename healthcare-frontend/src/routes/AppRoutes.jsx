import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Medecins from './pages/Medecins';
import Patients from './pages/Patients';
import About from './pages/About';
import NotFound from './pages/NotFound';

import AddMedecin from './medecins/AddMedecin';
import EditMedecin from './medecins/EditMedecin';
import MedecinDetails from './medecins/MedecinDetails';

import AddPatient from './patients/AddPatient';
import EditPatient from './patients/EditPatient';
import PatientDetails from './patients/PatientDetails';

import Layout from './components/Layout';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />

          <Route path="doctors" element={<Medecins />} />
          <Route path="doctors/add" element={<AddMedecin />} />
          <Route path="doctors/edit/:id" element={<EditMedecin />} />
          <Route path="doctors/:id" element={<MedecinDetails />} />

          <Route path="patients" element={<Patients />} />
          <Route path="patients/add" element={<AddPatient />} />
          <Route path="patients/edit/:id" element={<EditPatient />} />
          <Route path="patients/:id" element={<PatientDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;