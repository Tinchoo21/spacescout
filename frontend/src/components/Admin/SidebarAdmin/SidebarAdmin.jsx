import React, { useState } from 'react';
import spaceScoutLogo from '../../../images/spacescout_noback.png';
import './SidebarAdmin.css';
import { Link, useLocation } from 'react-router-dom';
import { BsListColumnsReverse, BsHouses, BsHouseAdd } from 'react-icons/bs';
import { BiExit } from 'react-icons/bi';

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [ setActiveLink] = useState(location.pathname);

  const handleLinkClick = (linkTo) => {
    setActiveLink(linkTo);
  };

  const navigationLinks = [
    { to: '/admin', name: 'All properties', icon: <BsHouses className='sidebarIcons' /> },
    { to: '/admin/add/property', name: 'Add property', icon: <BsHouseAdd className='sidebarIcons' /> },
    { to: '/admin/tours', name: 'Tours schedule', icon: <BsListColumnsReverse className='sidebarIcons' /> },
    { to: '/', name: 'Log out', icon: <BiExit className='sidebarIcons' /> },
  ];


  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="logo-details">
        <i className='bx'>
          <img src={spaceScoutLogo} alt='logo' width="65px" height="60px" draggable="false" />
        </i>
        <span className="logo_name">Admin</span>
      </div>
      <ul className="nav-links">
        {navigationLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
              onClick={() => handleLinkClick(link.to)}
            >
              {link.icon}
              <span className="links_name">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
