import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Patients from "../pages/patient/Patients";
import Medecins from "../pages/medecin/Medecins";
import About from "../pages/about/About";
import NotFound from "../pages/notFound/NotFound";

import AddPatient from "../patients/AddPatient";
import EditPatient from "../patients/EditPatient";
import PatientDetails from "../patients/PatientDetails";

import AddMedecin from "../medecins/AddMedecin";
import EditMedecin from "../medecins/EditMedecin";
import MedecinDetails from "../medecins/MedecinDetails";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <main className="page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="patients" element={<Patients />} />
          <Route path="patients/add" element={<AddPatient />} />
          <Route path="patients/edit/:id" element={<EditPatient />} />
          <Route path="patients/:id" element={<PatientDetails />} />

          <Route path="medecins" element={<Medecins />} />
          <Route path="medecins/add" element={<AddMedecin />} />
          <Route path="medecins/edit/:id" element={<EditMedecin />} />
          <Route path="medecins/:id" element={<MedecinDetails />} />

          <Route path="about" element={<About />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;