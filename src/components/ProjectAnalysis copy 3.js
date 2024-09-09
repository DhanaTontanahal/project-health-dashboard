import React, { useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import ProjectTable from './ProjectTable';

const ProjectAnalysis = ({ projects }) => {
  // Convert project data to array
  const projectData = Object.keys(projects).map(key => ({
    id: key,
    ...projects[key],
  }));

  // Custom sorting logic
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  
  const sortedData = React.useMemo(() => {
    let sortableData = [...projectData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [projectData, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h2>Project Analysis</h2>

      {/* Bar Chart */}
      <h3>Budget Analysis (Bar Chart)</h3>
      <BarChart projectData={projectData} />

      {/* Pie Chart */}
      <h3>Budget Remaining (Pie Chart)</h3>
      <PieChart projectData={projectData} />

      {/* Custom Table */}
      <h3>Project Data Table</h3>
      <ProjectTable sortedData={sortedData} requestSort={requestSort} sortConfig={sortConfig} />
    </div>
  );
};

export default ProjectAnalysis;
