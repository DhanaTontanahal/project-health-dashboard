import React, { useState } from 'react';
import './App.css';
import ProjectDashboard from './components/ProjectDashboard'; // Assuming this is your default dashboard view
import BudgetStatus from './components/BudgetStatus'; // Assuming this shows budget info
import ProjectTable from './components/ProjectTable'; // Assuming this shows the project table
import SideMenu from './components/SideMenu'; // Side menu to control navigation
import AdvancedDashboard from "./AdvancedDashboard";

function App() {
  const [activeView, setActiveView] = useState('Dashboard'); // Track active view

  // Function to render the content based on the active menu item
  const renderContent = () => {
    switch (activeView) {
      case 'Dashboard':
        return <ProjectDashboard />;
      case 'Insights':
        return <AdvancedDashboard/>
      case 'Projects':
        return <ProjectTable />;
      default:
        return <ProjectDashboard />;
    }
  };

  return (
    <div className="App" style={{ display: 'flex' }}>
      <SideMenu handleMenuClick={setActiveView} /> 
      <div style={{ flex: 1, padding: '20px' }}>
        {renderContent()} 
      </div>
    </div>
  );
}

export default App;
