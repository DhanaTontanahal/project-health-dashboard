import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ScheduleAdherence = ({ projects }) => {
  // Extract project names and their schedule variance
  const projectNames = Object.keys(projects);
  const scheduleVariances = projectNames.map((projectId) => projects[projectId].scheduleAdherence.scheduleVariance);

  // Data for Bar Chart
  const data = {
    labels: projectNames,
    datasets: [
      {
        label: 'Schedule Variance',
        data: scheduleVariances,
        backgroundColor: scheduleVariances.map((variance) => (variance > 0 ? 'green' : 'red')),
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Schedule Variance (Ahead or Behind Schedule)',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Schedule Variance (days)',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div>
      <h2>Schedule Variance Across Projects</h2>
      <Bar data={data} options={options} />

      {/* Additional table or text to show the details */}
      <table border="1" width="100%" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Schedule Variance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projectNames.map((projectId, index) => (
            <tr key={projectId}>
              <td>{projectId}</td>
              <td>{scheduleVariances[index]}</td>
              <td>{scheduleVariances[index] > 0 ? 'Ahead of Schedule' : 'Behind Schedule'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleAdherence;
