import React, { useState, useEffect } from 'react';
import { ref, get } from "firebase/database"; // Import Firebase functions
import { database } from './firebase'; // Import Firebase config
import ProjectHealthScore from './components/ProjectHealthScore';
import { transformToHealthIndexData } from './utils/datatransform';
import styled from 'styled-components'
import BurnoutRiskHeatmap from "./components/BurnoutRiskHeatmap"

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


// Styled components for the layout
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;


function AdvancedDashboard() {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define a function to fetch data from Firebase
    const fetchData = async () => {
      const projectRef = ref(database, 'projects'); // Reference the "projects" node
      try {
        const snapshot = await get(projectRef); // Get the data
        if (snapshot.exists()) {
          setProjectData(snapshot.val()); // Set the data in state
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchData(); // Fetch the data when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (!projectData) {
    return <div>No project data available.</div>; // Handle case when no data is available
  }

  return (
    <div className="App">
      <Container>
        <Card>
          <ProjectHealthScore projects={transformToHealthIndexData(projectData)} />
        </Card>
        <Card>
          <BurnoutRiskHeatmap projects={transformToHealthIndexData(projectData)} />
        </Card>
      </Container>

    </div>
  );
}

export default AdvancedDashboard;
