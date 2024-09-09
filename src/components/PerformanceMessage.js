import React from 'react';

const PerformanceMessage = ({ projects }) => {
  // Arrays to hold projects with upward and downward trends
  const upwardTrendProjects = [];
  const downwardTrendProjects = [];

  // Iterate over each project and categorize based on the trend
  for (const projectId in projects) {
    const project = projects[projectId];
    if (project.kpiTracking.trendIndicator === 'up') {
      upwardTrendProjects.push(projectId);
    } else if (project.kpiTracking.trendIndicator === 'down') {
      downwardTrendProjects.push(projectId);
    }
  }

  // Generate the message dynamically
  const generateMessage = () => {
    let message = '';

    if (upwardTrendProjects.length > 0) {
      message += `Projects with improving KPIs like ${upwardTrendProjects.join(' and ')}, which have upward trends in their Project Performance KPI, indicate positive momentum. `;
    }

    if (downwardTrendProjects.length > 0) {
      message += `In contrast, projects like ${downwardTrendProjects.join(' and ')}, which have downward trends in their Project Performance KPI, might need intervention to avoid further decline in performance.`;
    }

    return message;
  };

  return (
    <div>
      <p>{generateMessage()}</p>
    </div>
  );
};

export default PerformanceMessage;
