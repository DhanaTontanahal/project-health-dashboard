import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MilestoneChart = ({ projects }) => {
  let delayedCount = 0;
  let onTrackCount = 0;

  // Count milestones based on their status
  Object.keys(projects).forEach((projectId) => {
    const milestones = projects[projectId].scheduleAdherence?.milestones || [];
    milestones.forEach((milestone) => {
      if (milestone.status === 'Delayed') {
        delayedCount += 1;
      } else {
        onTrackCount += 1;
      }
    });
  });

  const data = {
    labels: ['Delayed', 'On Track'],
    datasets: [
      {
        label: '# of Milestones',
        data: [delayedCount, onTrackCount],
        backgroundColor: ['red', 'green'],
      },
    ],
  };

  return (
    <div>
      <h3>Milestone Status Distribution</h3>
      <Pie data={data} />
    </div>
  );
};

export default MilestoneChart;
