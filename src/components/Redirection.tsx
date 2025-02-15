import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import FileUploadWithNavigation from './FileUploadWithNavigation';
import { Settings } from 'lucide-react';

const Rediraction: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Settings" element={<SidebarSettings />} />
      <Route path="/Search" element={<SidebarSearch />} />
      <Route path="/" element={<Login />} />
      
      <Route path="/upload" element={<FileUploadWithNavigation />} />
      </Routes>
    </Router>
  );
};

export default Rediraction;