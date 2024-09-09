import React from 'react';

// ResourceUtilization Component
const ResourceUtilization = ({ projects }) => {
  // Extract project data with resource utilization percentage
  const projectData = Object.keys(projects).map(projectId => {
    const utilization = projects[projectId].resourceUtilization?.utilizationPercentage || 0;
    return {
      projectId,
      utilization,
    };
  });

  return (
    <div>
      <h2>Project Resource Utilization</h2>
      <div 
            style={{
              maxHeight: '400px', 
              overflowY: 'auto',   
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
      
      >
        {projectData.map((project) => (
          <div key={project.projectId} style={{ marginBottom: '20px' }}>
            <h3>{project.projectId}</h3>
            <div style={{ backgroundColor: '#eee', height: '20px', borderRadius: '10px', width: '100%', position: 'relative' }}>
              <div
                style={{
                  width: `${project.utilization}%`,
                  backgroundColor: project.utilization >= 90 ? 'red' : project.utilization <= 60 ? 'orange' : 'green',
                  height: '100%',
                  borderRadius: '10px',
                }}
              />
            </div>
            <p>{project.utilization}% utilization</p>
            {project.utilization >= 90 && <p style={{ color: 'red' }}>High utilization, potential burnout risk.</p>}
            {project.utilization <= 60 && <p style={{ color: 'orange' }}>Low utilization, underutilization of resources.</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceUtilization;
