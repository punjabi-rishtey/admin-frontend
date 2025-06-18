import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Users', path: '/users' },
    { name: 'Owner\'s Creatives', path: '/creatives' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Customer Support', path: '/support' },
    { name: 'Payment Requests', path: '/admin/payment-requests' },
    { name: 'Membership Plans', path: '/admin/memberships' },
    { name: 'Coupons', path: '/admin/coupons' }, // Added Coupons page
    {name: 'Message', path: '/message'}
  ];

  return (
    <div className="h-full w-64 bg-gray-800 text-white fixed">
      <div className="p-5">Admin Console</div>
      <ul className="list-none">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'block p-4 bg-gray-700' : 'block p-4 text-gray-300 hover:bg-gray-700'
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;