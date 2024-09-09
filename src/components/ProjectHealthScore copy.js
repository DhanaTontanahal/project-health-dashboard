import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Function to calculate health score
const calculateHealthScore = (project) => {
  const { resourceUtilization, budgetStatus, scheduleAdherence, scopeControl } = project;

  // Extract KPIs
  const utilization = resourceUtilization?.utilizationPercentage || 0;
  const costVariance = parseFloat(budgetStatus?.costVariance || 0);
  const scheduleVariance = scheduleAdherence?.scheduleVariance || 0;
  const scopeVariance = scopeControl?.scopeVariance || 0;

  // Normalize the KPIs to generate a composite health score (scale from 0 to 100)
  let healthScore = 100;
  
  // Adjust for resource utilization (best is between 70-85%)
  if (utilization > 85) healthScore -= (utilization - 85) * 0.5;
  else if (utilization < 70) healthScore -= (70 - utilization) * 0.5;

  // Adjust for cost variance (penalize positive cost variance)
  healthScore -= Math.abs(costVariance) * 0.2;

  // Adjust for schedule variance (penalize delays)
  healthScore -= Math.abs(scheduleVariance) * 2;

  // Adjust for scope variance (penalize scope creep)
  healthScore -= Math.abs(scopeVariance) * 2;

  return Math.max(0, Math.min(healthScore, 100)); // Ensure score is between 0 and 100
};

// ProjectHealthScore Component
const ProjectHealthScore = ({ projects }) => {
  // Generate health score for each project
  const projectData = Object.keys(projects).map(projectId => {
    const healthScore = calculateHealthScore(projects[projectId]);
    return {
      projectId,
      healthScore,
    };
  });

  // Prepare data for chart.js
  const chartData = {
    labels: projectData.map(project => project.projectId),
    datasets: [
      {
        label: 'Health Score',
        data: projectData.map(project => project.healthScore),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const averageScore = projectData.reduce((acc, proj) => acc + proj.healthScore, 0) / projectData.length;

  // Dynamic text based on the health score distribution
  const topText = averageScore > 80
    ? "Overall, the projects are in good health!"
    : averageScore > 50
    ? "Projects are doing well, but some may need attention."
    : "Several projects require immediate intervention to avoid failure.";

  const bottomText = `The average health score is ${averageScore.toFixed(1)}. Consider reviewing the projects with low scores.`;

  return (
    <div>
      <h2>Project Health Score</h2>
      <p>{topText}</p>

      {/* Bar Chart */}
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Bar data={chartData} />
      </div>

      <p>{bottomText}</p>
    </div>
  );
};

export default ProjectHealthScore;
