import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, LineElement, PointElement);

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

  const barData = {
    labels: projectData.map((p) => p.id),
    datasets: [
      {
        label: 'Total Budget',
        data: projectData.map((p) => p.budgetStatus.totalBudget),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Spent to Date',
        data: projectData.map((p) => p.budgetStatus.spentToDate),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: projectData.map((p) => p.id),
    datasets: [
      {
        label: 'Budget Remaining',
        data: projectData.map((p) => p.budgetStatus.budgetRemaining),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const lineData = {
    labels: projectData.map((p) => p.id),
    datasets: [
      {
        label: 'Project Progress (%)',
        data: projectData.map((p) => p.scheduleAdherence.currentProgress),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
      },
    ],
  };

  return (
    <div>
      <h2>Project Analysis</h2>

      {/* Bar Chart */}
      <h3>Budget Analysis (Bar Chart)</h3>
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Bar data={barData} />
      </div>

      {/* Pie Chart */}
      <h3>Budget Remaining (Pie Chart)</h3>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Pie data={pieData} />
      </div>

      {/* Line Chart */}
      <h3>Project Progress (Line Chart)</h3>
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Line data={lineData} />
      </div>

      {/* Custom Table */}
      <h3>Project Data Table</h3>
      <table style={{ border: '1px solid black', width: '100%', margin: '20px 0', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')} style={{ padding: '10px', cursor: 'pointer' }}>
              Project {sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('budgetStatus.totalBudget')} style={{ padding: '10px', cursor: 'pointer' }}>
              Total Budget {sortConfig.key === 'budgetStatus.totalBudget' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('budgetStatus.spentToDate')} style={{ padding: '10px', cursor: 'pointer' }}>
              Spent to Date {sortConfig.key === 'budgetStatus.spentToDate' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('budgetStatus.budgetRemaining')} style={{ padding: '10px', cursor: 'pointer' }}>
              Budget Remaining {sortConfig.key === 'budgetStatus.budgetRemaining' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('scheduleAdherence.currentProgress')} style={{ padding: '10px', cursor: 'pointer' }}>
              Progress (%) {sortConfig.key === 'scheduleAdherence.currentProgress' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('resourceUtilization.utilizationPercentage')} style={{ padding: '10px', cursor: 'pointer' }}>
              Utilization (%) {sortConfig.key === 'resourceUtilization.utilizationPercentage' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => requestSort('kpiTracking.currentValue')} style={{ padding: '10px', cursor: 'pointer' }}>
              KPI - Current Value {sortConfig.key === 'kpiTracking.currentValue' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((project) => (
            <tr key={project.id}>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.id}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.budgetStatus.totalBudget}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.budgetStatus.spentToDate}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.budgetStatus.budgetRemaining}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.scheduleAdherence.currentProgress}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{project.resourceUtilization.utilizationPercentage}</td>
              {/* Conditional rendering to avoid undefined errors */}
              <td style={{ padding: '10px', border: '1px solid gray' }}>
                {project.kpiTracking && project.kpiTracking.currentValue !== undefined
                  ? project.kpiTracking.currentValue
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectAnalysis;
