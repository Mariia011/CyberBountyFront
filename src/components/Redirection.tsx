import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import FileUploader from './FileUploader';
import SidebarSettings from './sidebar/Settings';
import SidebarSearch from './sidebar/Search';
import Register from './Register';
import SidebarHistory from './SidebarHistory';
import Receiver from './Receiver';
import Homepage from './Homepage';


const Redirection: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={< Homepage/>} />
      <Route path="/settings" element={<SidebarSettings />} />
      <Route path="/search" element={<SidebarSearch />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<FileUploader />} />
      <Route path="/history" element={<SidebarHistory />} />
      <Route path="/receiver" element={<Receiver />} />
      </Routes>
    </Router>
  );
};

export default Redirection;
