import React from 'react';

// CurrentProgress Component
const CurrentProgress = ({ projects }) => {
  // Extract project data with current progress
  const projectData = Object.keys(projects).map(projectId => {
    const progress = projects[projectId].scheduleAdherence?.currentProgress || 0;
    return {
      projectId,
      progress,
    };
  });

  return (
    <div>
      <h2>Project Current Progress</h2>
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
                  width: `${project.progress}%`,
                  backgroundColor: project.progress >= 90 ? 'green' : project.progress <= 20 ? 'red' : 'orange',
                  height: '100%',
                  borderRadius: '10px',
                }}
              />
            </div>
            <p>{project.progress}% completed</p>
            {project.progress >= 90 && <p style={{ color: 'green' }}>This project is nearing completion.</p>}
            {project.progress <= 20 && <p style={{ color: 'red' }}>This project needs more attention.</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentProgress;
