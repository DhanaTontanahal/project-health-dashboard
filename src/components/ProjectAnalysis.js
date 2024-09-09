import React, { useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import ProjectTable from './ProjectTable';
import styled from 'styled-components';
import {generateScheduleVarianceData, transformProjectData} from "../utils/datatransform"
import PerformanceTrends from "./PerformanceTrends"
import PerformanceMessage from './PerformanceMessage';
import ScheduleAdherence from './ScheduleAdherence';
import MilestoneTracker from './MilestoneTracker';
import MilestoneChart from './MilestoneChart';
import CurrentProgress from './CurrentProgress';
import ResourceUtilization from './ResourceUtilization';
import ScopeControl from './ScopeControl';


// Styled components for the layout
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

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
      {/* <h2>Project Analysis</h2> */}

      <Container>
        {/* Bar Chart */}
        <Card>
          <h3>Budget Analysis </h3>
          <BarChart projectData={projectData} />
        </Card>

        {/* Pie Chart */}
        <Card>
          <h3>Budget Remaining</h3>
          <PieChart projectData={projectData} />
        </Card>

        {/* Custom Table
        <Card style={{ gridColumn: 'span 2' }}>
          <h3>Project Data Table</h3>
          <ProjectTable sortedData={sortedData} requestSort={requestSort} sortConfig={sortConfig} />
        </Card>
         */}
        <Card>
          <PerformanceTrends performance={projectData} projects={transformProjectData(projectData)} />
        </Card>
        <Card>      <ScheduleAdherence projects={generateScheduleVarianceData(projectData)} /></Card>
        <Card>
          <MilestoneTracker projects={projectData} />
        </Card>
        <Card>
          <CurrentProgress projects={projectData} />
        </Card>

        <Card>
          <ResourceUtilization projects={projectData}/>
        </Card>

        <Card>
        <ScopeControl projects={projectData} />

        </Card>

      </Container>
    </div>
  );
};

export default ProjectAnalysis;
