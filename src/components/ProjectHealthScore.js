import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProjectHealthScore = ({ projects }) => {
  // Process project data for health scores
  const projectData = Object.keys(projects).map((key) => ({
    id: key,
    healthScore: projects[key].kpiTracking.currentValue,
  }));

  // Define a threshold for low scores
  const lowScoreThreshold = 50;

  // Colors for bars: one for low scores and another for higher scores
  const barColors = projectData.map((project) =>
    project.healthScore < lowScoreThreshold ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)'
  );

  const barData = {
    labels: projectData.map((p) => p.id),
    datasets: [
      {
        label: 'Health Score',
        data: projectData.map((p) => p.healthScore),
        backgroundColor: barColors,
      },
    ],
  };

  // Calculate average health score and count projects below/above threshold
  const totalScore = projectData.reduce((sum, project) => sum + project.healthScore, 0);
  const averageScore = (totalScore / projectData.length).toFixed(1);
  const lowScoreProjects = projectData.filter((p) => p.healthScore < lowScoreThreshold);
  const highScoreProjects = projectData.filter((p) => p.healthScore >= lowScoreThreshold);

  return (
    <div>
      <h2>Project Health Score</h2>

      {/* Dynamic summary at the top */}
      <p>
        {lowScoreProjects.length > 0
          ? `Several projects require immediate intervention to avoid failure.`
          : `Overall, the projects are in good health!`}
      </p>

      {/* Bar Chart */}
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Bar data={barData} />
      </div>

      {/* Summary of health index */}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        The average health score is {averageScore}. {lowScoreProjects.length > 0
          ? `Consider reviewing the ${lowScoreProjects.length} project(s) with low scores: ${lowScoreProjects.map(
              (p) => p.id
            ).join(', ')}.`
          : `All projects have satisfactory health.`}
      </p>
    </div>
  );
};

export default ProjectHealthScore;
