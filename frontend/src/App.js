import React, {  } from 'react';
import { } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Panel from './pages/User/Panel/Panel';
import Contact from './pages/User/Contact/Contact';
import AboutUs from './pages/User/AboutUs/AboutUs';
import Properties from './pages/User/Properties/Properties';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Panel />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/properties" element={<Properties />} />
    </Routes>
  );
}

export default App;
