import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthGuard from "../guards/AuthGuard";
import RoleGuard from "../guards/RoleGuard";

import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import About from "../pages/about/About";
import NotFound from "../pages/notFound/NotFound";

import Patients from "../patients/PatientsList";
import AddPatient from "../patients/AddPatient";
import EditPatient from "../patients/EditPatient";
import PatientDetails from "../patients/PatientDetails";

import Medecins from "../medecins/MedecinsList";
import AddMedecin from "../medecins/AddMedecin";
import EditMedecin from "../medecins/EditMedecin";
import MedecinDetails from "../medecins/MedecinDetails";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <div className="main-content">
          <main className="page-content">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
   <Router>
  <Routes>

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route element={<AuthGuard />}>
      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />

 <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>

  <Route path="patients" element={<Patients />} />
  <Route path="patients/add" element={<AddPatient />} />
  <Route path="medecins" element={<Medecins />} />
  <Route path="medecins/add" element={<AddMedecin />} />
  <Route path="medecins/edit/:id" element={<EditMedecin />} />
  <Route path="medecins/:id" element={<MedecinDetails />} />

</Route>

<Route element={<RoleGuard allowedRoles={["ADMIN", "PATIENT"]} />}>
  <Route path="patients/edit/:id" element={<EditPatient />} />
</Route>

<Route
  element={
    <RoleGuard allowedRoles={["ADMIN", "MEDECIN", "PATIENT"]} />
  }
>
  <Route path="patients/:id" element={<PatientDetails />} />
</Route>

      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />

  </Routes>
</Router>
  );
};

export default AppRoutes;