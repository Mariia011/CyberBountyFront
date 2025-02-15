import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import FileUploadWithNavigation from './FileUploadWithNavigation';
import SidebarSettings from './SidebarSettings';
import SidebarSearch from './SidebarSearch';
import Register from './Register';


const Rediraction: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/Settings" element={<SidebarSettings />} />
      <Route path="/Search" element={<SidebarSearch />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<FileUploadWithNavigation />} />
      </Routes>
    </Router>
  );
};

export default Rediraction;