import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const ProjectAnalysis = ({ projects }) => {
  // Extract the relevant data for visualization
  const projectNames = projects.map((project) => project.kpiTracking.kpiName);
  const totalBudgets = projects.map((project) => project.budgetStatus.totalBudget);
  const spentAmounts = projects.map((project) => project.budgetStatus.spentToDate);

  const barData = {
    labels: projectNames,
    datasets: [
      {
        label: 'Total Budget',
        data: totalBudgets,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Spent to Date',
        data: spentAmounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: projectNames,
    datasets: [
      {
        label: 'Budget Remaining',
        data: projects.map((project) => project.budgetStatus.budgetRemaining),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div>
      <h2>Budget Analysis</h2>
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Bar data={barData} />
      </div>

      <h2>Budget Remaining (Pie Chart)</h2>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default ProjectAnalysis;
