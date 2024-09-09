import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTachometerAlt, FaTasks, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase'; // Firebase configuration

// Styled components for Header and SideMenu
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SideMenu = styled.nav`
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

const MainContent = styled.main`
  flex: 1;
  background-color: #f8f9fa;
  padding: 20px;
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

const LoginButton = styled.button`
  background-color: #4285F4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #357ae8;
  }
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

// Main Component
const ProjectDashboard = () => {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Handle Google Sign-in
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => console.log(error));
  };

  // Handle Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.log(error));
  };

  if (!user) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <LoginButton onClick={handleLogin}>Login with Google</LoginButton>
      </Container>
    );
  }

  return (
    <Container>
      {/* Side Menu */}
      <SideMenu>
        <MenuItem>
          <FaTachometerAlt /> Dashboard
        </MenuItem>
        <MenuItem>
          <FaTasks /> Tasks
        </MenuItem>
        <MenuItem>
          <FaChartLine /> Reports
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </MenuItem>
      </SideMenu>

      {/* Main Content */}
      <MainContent>
        <Header>
          <Profile>
            <img src={user.photoURL} alt="Profile" />
            <span>{user.displayName}</span>
          </Profile>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <h1>Welcome to the Project Health Dashboard</h1>
        <p>Here you can track the overall health of your projects, including budget, schedule, and resource utilization.</p>
      </MainContent>
    </Container>
  );
};

export default ProjectDashboard;
