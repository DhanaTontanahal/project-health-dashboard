// SideMenu.js
import React from 'react';
import styled from 'styled-components';
import { FaTachometerAlt, FaTasks, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const SideMenuContainer = styled.nav`
  width: 250px;
  background-color: #343a40;
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #495057;
  }

  svg {
    margin-right: 10px;
  }
`;

const SideMenu = ({ handleMenuClick }) => {
  return (
    <SideMenuContainer>
      <MenuItem onClick={() => handleMenuClick('Dashboard')}>
        <FaTachometerAlt /> Dashboard
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick('BudgetStatus')}>
        <FaTasks /> Budget Status
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick('Projects')}>
        <FaChartLine /> Projects
      </MenuItem>
      <MenuItem onClick={() => alert('Logout functionality to be implemented')}>
        <FaSignOutAlt /> Logout
      </MenuItem>
    </SideMenuContainer>
  );
};

export default SideMenu;
