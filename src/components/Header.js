// Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #007bff;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    width: 40px;
    margin-right: 10px;
  }

  span {
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
`;

const Button = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #e60000;
  }
`;

const Header = ({ user, handleLogout }) => {
  return (
    <HeaderContainer>
      <Profile>
        <img src={user.photoURL} alt="Profile" />
        <span>{user.displayName}</span>
      </Profile>
      <Button onClick={handleLogout}>Logout</Button>
    </HeaderContainer>
  );
};

export default Header;
