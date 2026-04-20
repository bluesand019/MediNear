import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import DoctorSearch from "../pages/DoctorSearch";
import DoctorDetail from "../pages/DoctorDetail";
import HospitalDetail from "../pages/HospitalDetail";
import ServiceSearch from "../pages/ServiceSearch";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Root from "../components/layout/Navbar";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "doctor/:id", element: <DoctorDetail /> },

      { path: "doctor-search", element: <DoctorSearch /> },
      { path: "hospital-detail", element: <HospitalDetail /> },
      { path: "service-search", element: <ServiceSearch /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
