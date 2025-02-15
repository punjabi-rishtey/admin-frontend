import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Creatives from './components/Creatives';
import Analytics from './components/Analytics';
import Support from './components/Support';
import Login from './components/Login';
import EditUser from './components/EditUser';

const App = () => {
  const location = useLocation(); // Hook to access the current route
  const showSidebar = location.pathname !== '/'; // Determine if sidebar should be shown

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className={`${showSidebar ? 'ml-64' : ''} p-8 w-full`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/creatives" element={<Creatives />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
