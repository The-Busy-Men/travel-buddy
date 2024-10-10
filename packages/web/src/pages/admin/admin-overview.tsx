import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './components/admin-overview.css'; // Import the CSS file
import { isUserAllowed, UserRoles } from '../utils/isUserAllowed';

// Define routes and descriptions for each admin item
const adminItems = [
  {
    title: 'Settings',
    description: 'Configure system and platform settings',
    route: '/admin/settings',
    disabled: true,
    requiredRoles: [UserRoles.super_admin],
  },
  {
    title: 'User Management',
    description: 'Manage, delete and create users with an Frontend UI',
    route: '/admin/user-management',
    disabled: true,
    requiredRoles: [UserRoles.super_admin],
  },
  {
    title: 'Hotel Overview',
    description: 'View all Hotels existing and further informations',
    route: '/admin/hotels',
    disabled: false,
    requiredRoles: [UserRoles.admin, UserRoles.super_admin],
  },
  {
    title: 'AirBnb Overview',
    description: 'View all AirBnbs that exist and further informations',
    route: '/admin/airbnbs',
    disabled: false,
    requiredRoles: [UserRoles.admin, UserRoles.super_admin],
  },
  {
    title: 'Group Overview',
    description: 'View all Groups that have been created',
    route: '/admin/groups',
    disabled: false,
    requiredRoles: [UserRoles.admin, UserRoles.super_admin],
  },
  {
    title: 'Reports',
    description: 'View reports from Users and see open Customer Service chats',
    route: '/admin/reports',
    disabled: true,
    requiredRoles: [UserRoles.moderator, UserRoles.admin, UserRoles.super_admin],
  },
  {
    title: 'Analytics',
    description: 'Dashboard of Analytics',
    route: '/admin/reports',
    disabled: true,
    requiredRoles: [UserRoles.admin, UserRoles.super_admin],
  },
  {
    title: 'Notifications',
    description: 'Manage notifications and send alerts',
    route: '/admin/notifications',
    disabled: true,
    requiredRoles: [UserRoles.admin, UserRoles.super_admin],
  },
  {
    title: 'Admin Chat',
    description: 'Internal chat Rooms to communicate with the team',
    route: '/admin/notifications',
    disabled: true,
    requiredRoles: [UserRoles.moderator, UserRoles.admin, UserRoles.super_admin],
  },
];

export const AdminMainPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isUserAllowed({requiredRoles: [UserRoles.moderator, UserRoles.admin, UserRoles.super_admin]})) {
      navigate('/')
    }
  }, [navigate]);

  return ( 
    <div className="admin-page">
      <h1 className='text-4xl font-bold mb-30 text-red-800 flex justify-center mb-10'>Admin Dashboard</h1>
      <div className="admin-grid">
        {adminItems.map((item) => (
          isUserAllowed({requiredRoles: item.requiredRoles}) && 
          <div
            key={item.title}
            className={`admin-card ${item.disabled ? 'disabled' : ''}`}
          >
            {!item.disabled ? (
              <Link to={item.route} className="card-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </Link>
            ) : (
              <div className="card-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
