// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Creatives from './components/Creatives';
import Analytics from './components/Analytics';
import Support from './components/Support';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/creatives" element={<Creatives />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
