import React, { useState, useEffect } from 'react';
import { ref, get } from "firebase/database"; // Import Firebase functions
import { database } from './firebase'; // Import Firebase config
import ProjectAnalysis from './components/ProjectAnalysis';

function TestDashboard() {
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
      {/* Pass the fetched project data to ProjectAnalysis component */}
      <ProjectAnalysis projects={projectData} />
    </div>
  );
}

export default TestDashboard;
