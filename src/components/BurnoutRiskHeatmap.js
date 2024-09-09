import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BurnoutRiskHeatmap = ({ projects }) => {
  // Process project data for burnout risk
  const projectData = Object.keys(projects).map((key) => ({
    id: key,
    utilization: projects[key].resourceUtilization.utilizationPercentage,
    scheduleVariance: projects[key].scheduleAdherence.scheduleVariance,
    milestones: projects[key].scheduleAdherence.milestones,
  }));

  // Set color intensity based on utilization percentage and schedule variance
  const riskColors = projectData.map((project) => {
    const utilization = project.utilization;
    const scheduleDelay = project.scheduleVariance < 0;
    const milestoneDelays = project.milestones.some((m) => m.status === 'Delayed');

    let riskLevel = 0;

    if (utilization > 85) riskLevel += 1; // High utilization
    if (scheduleDelay) riskLevel += 1; // Schedule behind
    if (milestoneDelays) riskLevel += 1; // Delayed milestones

    // Heatmap color scaling based on risk levels
    switch (riskLevel) {
      case 3:
        return 'rgba(255, 0, 0, 0.6)'; // Highest risk (all metrics show burnout)
      case 2:
        return 'rgba(255, 165, 0, 0.6)'; // Moderate risk (two metrics show burnout)
      case 1:
        return 'rgba(255, 255, 0, 0.6)'; // Low risk (one metric shows burnout)
      default:
        return 'rgba(75, 192, 192, 0.6)'; // No risk
    }
  });

  const data = {
    labels: projectData.map((p) => p.id),
    datasets: [
      {
        label: 'Burnout Risk',
        data: projectData.map((p) => p.utilization),
        backgroundColor: riskColors,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Utilization Percentage',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Projects',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Optional: Hide the legend
      },
    },
  };

  return (
    <div>
      <h2>Burnout Risk Heatmap</h2>
      <p>
        Projects with high resource utilization, schedule delays, and delayed milestones are at risk of burnout.
      </p>

      <div style={{ width: '600px', margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Projects with red indicate a higher risk of burnout due to high utilization and delays.
      </p>
    </div>
  );
};

export default BurnoutRiskHeatmap;
