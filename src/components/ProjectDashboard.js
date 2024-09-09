// ProjectDashboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import SideMenu from './SideMenu';
import Header from './Header';
import TestDashboard from '../TestDashboard';

// Styled components for layout
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #f8f9fa;
  padding: 20px;
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
      {/* SideMenu Component */}
      {/* <SideMenu handleLogout={handleLogout} /> */}
      
      {/* Main Content */}
      <MainContent>
        {/* Header Component */}
        <Header user={user} handleLogout={handleLogout} />
        
        {/* <h1>Welcome to the Project Health Dashboard</h1> */}
        {/* <p>Here you can track the overall health of your projects, including budget, schedule, and resource utilization.</p> */}
        <TestDashboard/>
      </MainContent>
    </Container>
  );
};

export default ProjectDashboard;
