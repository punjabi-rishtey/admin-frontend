import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";
import Creatives from "./components/Creatives";
import Analytics from "./components/Analytics";
import Support from "./components/Support";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";
import AdminMemberships from "./components/Memberships";
import CouponsPage from "./components/CouponsPage";
import PaymentsPage from "./components/PaymentsPage";
import MessagePage from "./components/MessagePage";

const App = () => {
  const location = useLocation(); // Hook to access the current route
  const showSidebar = location.pathname !== "/"; // Determine if sidebar should be shown

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className={`${showSidebar ? "ml-64" : ""} p-8 w-full`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/creatives" element={<Creatives />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/support" element={<Support />} />\
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/admin/coupons" element={<CouponsPage />} />
          <Route path="/admin/memberships" element={<AdminMemberships />} />
          <Route path="/admin/payment-requests" element={<PaymentsPage />} />
          <Route path="/message" element={<MessagePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
