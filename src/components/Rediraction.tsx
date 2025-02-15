import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import FileUploadWithNavigation from './FileUploadWithNavigation';

const Rediraction: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<FileUploadWithNavigation />} />
      </Routes>
    </Router>
  );
};

export default Rediraction;