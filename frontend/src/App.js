import React, {  } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Panel from './pages/User/Panel/Panel';
import Contact from './pages/User/Contact/Contact';
import AboutUs from './pages/User/AboutUs/AboutUs';
import Properties from './pages/User/Properties/Properties';
import AdminPanel from './pages/Admin/AdminPanel/AdminPanel';
import PropertyDetails from './pages/User/PropertyDetails/PropertyDetails';
import AdminEditProperty from './pages/Admin/AdminEditProperty/AdminEditProperty';
import AdminAddProperty from './pages/Admin/AdminAddProperty/AdminAddProperty';
import AdminTours from './pages/Admin/AdminTours/AdminTours';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Panel />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/propertydetail/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/edit/property/:id" element={<AdminEditProperty />} />
      <Route path="/admin/add/property" element={<AdminAddProperty />} />
      <Route path="/admin/tours" element={<AdminTours />} />
    </Routes>
  );
}

export default App;
