import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import PerformanceMessage from './PerformanceMessage';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceTrends = ({ performance,projects }) => {
  // Prepare data for the chart
  const labels = Object.keys(projects); // Project names as labels
  const kpiTrends = labels.map(key => projects[key].kpiTracking.trendIndicator); // Extract trend indicators for each project
  const kpiValues = labels.map(key => projects[key].kpiTracking.currentValue); // Extract KPI current values

  // Prepare chart data and styling
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Project KPI Trend',
        data: kpiValues,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        pointBackgroundColor: kpiTrends.map(trend =>
          trend === 'up' ? 'green' : trend === 'down' ? 'red' : 'yellow' // Color points based on trend
        ),
        pointRadius: 5,
        pointHoverRadius: 8,
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
        text: 'Project Performance KPI Trends',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'KPI Value',
        },
        min: 0,
        max: 100,
      },
      x: {
        title: {
          display: true,
          text: 'Projects',
        },
      },
    },
  };

  return (
    <div>
      <h2>Project Performance Trends</h2>
      <div>
      <PerformanceMessage projects={performance} />
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default PerformanceTrends;
