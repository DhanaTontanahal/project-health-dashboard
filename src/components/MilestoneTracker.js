import React from 'react';

// MilestoneTracker Component
const MilestoneTracker = ({ projects }) => {
  // Prepare milestone data for rendering
  const milestoneData = Object.keys(projects).map(projectId => {
    const milestones = projects[projectId].scheduleAdherence?.milestones || [];
    return {
      projectId,
      milestones,
    };
  });

  return (
    <div 
    >
      <h2>Milestone Tracking</h2>
      <div style={{
      maxHeight: '400px',
      overflowY: 'auto',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    }}
>
      <table border="1" width="100%" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Milestone Name</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {milestoneData.map((project) =>
            project.milestones.map((milestone, index) => (
              <tr key={`${project.projectId}-${index}`}>
                <td>{project.projectId}</td>
                <td>{milestone.name}</td>
                <td>{new Date(milestone.dueDate).toLocaleDateString()}</td>
                <td
                  style={{
                    color: milestone.status === 'Delayed' ? 'red' : 'green',
                  }}
                >
                  {milestone.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default MilestoneTracker;
